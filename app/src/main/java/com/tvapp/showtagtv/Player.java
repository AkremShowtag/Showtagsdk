package com.tvapp.showtagtv;



import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;

import android.os.Handler;
import android.os.Looper;
import android.util.Base64;
import android.util.Log;

import android.view.KeyEvent;
import android.view.PixelCopy;
import android.view.SurfaceView;
import android.view.View;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.annotation.RequiresApi;

import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.extractor.DefaultExtractorsFactory;
import com.google.android.exoplayer2.extractor.ExtractorsFactory;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.ui.SimpleExoPlayerView;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSourceFactory;
import com.showtag.sdk.Showtag;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;

public class Player extends Activity {


    SimpleExoPlayerView exoPlayerView;
    private String clientId;
    private String programCode;
    public static final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");
    private ImageView cart;
    OkHttpClient client = new OkHttpClient();


    public int RSelected = 3999;
    public int CSelected = 0;
    public WebView webView;
    public String IdSelected;
    public String OldSelected;
    public boolean isPaused = true;


    LinearLayout.LayoutParams param,param2 ;



    // creating a variable for exoplayer
    SimpleExoPlayer exoPlayer;

    // url of video which we are loading.
    String videoURL;

    Showtag obj;

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        exoPlayerView.showController();
        if(webView.getVisibility()==View.INVISIBLE){
            return super.dispatchKeyEvent(event);
        }
        return obj.navigation(event,false);
    }






    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);
        exoPlayerView = findViewById(R.id.idExoPlayerVIew);
        param = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT,
                0f
        );
        param2 = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT,
                1.0f
        );
        
        RSelected = 4000;
        CSelected = 0;
        IdSelected = "Vid";
        clientId = getIntent().getStringExtra("clientId");
        programCode = getIntent().getStringExtra("programCode");
        Log.d("program",programCode);
        videoURL = "https://tag"+clientId+".showtagenabled.com/programs/"+programCode+"/"+programCode+".mp4";
        Log.d("vid",videoURL);
        webView = findViewById(R.id.webview);
        exoPlayerView = findViewById(R.id.idExoPlayerVIew);
        cart = findViewById(R.id.cart);

        cart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        capturePicture();

            }
        });





        try {

            // bandwisthmeter is used for
            // getting default bandwidth
            BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();

            // track selector is used to navigate between
            // video using a default seekbar.
            TrackSelector trackSelector = new DefaultTrackSelector(new AdaptiveTrackSelection.Factory(bandwidthMeter));

            // we are adding our track selector to exoplayer.
            exoPlayer = ExoPlayerFactory.newSimpleInstance(this, trackSelector);

            //exoPlayer.addListener(new ExoPlayerListener(cart));
            // we are parsing a video url
            obj = new Showtag(webView,exoPlayer,exoPlayerView,cart,videoURL,programCode,getBaseContext());

            // and parsing its video uri.
            Uri videouri = Uri.parse(videoURL);

            // we are creating a variable for datasource factory
            // and setting its user agent as 'exoplayer_view'
            DefaultHttpDataSourceFactory dataSourceFactory = new DefaultHttpDataSourceFactory("exoplayer_video");

            // we are creating a variable for extractor factory
            // and setting it to default extractor factory.
            ExtractorsFactory extractorsFactory = new DefaultExtractorsFactory();

            // we are creating a media source with above variables
            // and passing our event handler as null,
            MediaSource mediaSource = new ExtractorMediaSource(videouri, dataSourceFactory, extractorsFactory, null, null);

            // inside our exoplayer view
            // we are setting our player
            exoPlayerView.setPlayer(exoPlayer);

            exoPlayer.addListener(new ExoPlayer.EventListener(){
                @Override
                public void onTimelineChanged(Timeline timeline, Object manifest) {

                }

                @Override
                public void onTracksChanged(TrackGroupArray trackGroups, TrackSelectionArray trackSelections) {

                }

                @Override
                public void onLoadingChanged(boolean isLoading) {

                }

                @Override
                public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
                    if (playWhenReady && playbackState == exoPlayer.STATE_READY) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                cart.setVisibility(View.INVISIBLE);

                            }
                        });
                    } else if (playWhenReady) {
                        // might be idle (plays after prepare()),
                        // buffering (plays when data available)
                        // or ended (plays when seek away from end)
                    } else {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                 cart.setVisibility(View.VISIBLE);
                            }
                        });
                    }
                }

                @Override
                public void onPlayerError(ExoPlaybackException error) {

                }

                @Override
                public void onPositionDiscontinuity() {

                }

                @Override
                public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {

                }
            });

            // we are preparing our exoplayer
            // with media source.
            exoPlayer.prepare(mediaSource);

            // we are setting our exoplayer
            // when it is ready.
            exoPlayer.setPlayWhenReady(true);

        } catch (Exception e) {
            // below line is used for
            // handling our errors.
            Log.e("TAG", "Error : " + e.toString());
        }









        //webView.loadUrl("https://google.com");
    }


    @RequiresApi(api = Build.VERSION_CODES.N)
    private void capturePicture() {
        Bitmap bmp = Bitmap.createBitmap(exoPlayerView.getVideoSurfaceView().getWidth(), exoPlayerView.getVideoSurfaceView().getHeight(), Bitmap.Config.ARGB_8888);
        PixelCopy.request((SurfaceView) exoPlayerView.getVideoSurfaceView(), bmp, i -> {
            Bitmap NEW = Bitmap.createScaledBitmap(bmp,1280,720,true);

            String value = BitmapToBase64(NEW);
            Log.d("third","third");
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            String a = value.replaceAll("\'","");
                            String b = a.replaceAll("\\n","");
                            String url = post("https://www.api.xs-anime.me/api/v1/images","{\"image\":"+"\""+b+"\"}");
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    takeScreenshot(getApplicationContext(),url);
                                }
                            });
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
        }, new Handler(Looper.getMainLooper()));
    }

    String post(String url, String json) throws IOException {
        RequestBody body = RequestBody.create(JSON, json); // new
        // RequestBody body = RequestBody.create(JSON, json); // old
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        Response response = client.newCall(request).execute();
        String value = "{\"arr\":"+response.body().string()+"}";
        try {
            JSONObject ob = new JSONObject(value);
            JSONObject jsonArray = ob.getJSONObject("arr");
            return jsonArray.getString("url");
        } catch (JSONException e) {
            e.printStackTrace();
            return "";
        }
        //return response.body().string();
    }


    private void takeScreenshot(Context cn,String url) {
        webView.setVisibility(View.VISIBLE);
        webView.setLayoutParams(param);
        exoPlayerView.setVisibility(View.INVISIBLE);
        exoPlayerView.setLayoutParams(param2);
        long time = exoPlayer.getCurrentPosition()/1000;
        Log.d("url",url);
        webView.loadUrl("javascript:var event = new CustomEvent('showtag',{'detail':{'time':'"+time+"','image':'"+url+"'}}); document.dispatchEvent(event); ");
        Log.d("showtag","var event = new CustomEvent('showtag',{'detail':{'time':'"+time+"','image':'"+url+"'}}); document.dispatchEvent(event); ");
        webView.loadUrl("javascript:var event = new Event('start'); document.dispatchEvent(event); ");

    }

    public String BitmapToBase64(Bitmap bitmap) {
        try{
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 40, outputStream);

            byte[] byteArray = outputStream.toByteArray();
            return "data:image/jpeg;base64,"+Base64.encodeToString(byteArray, Base64.DEFAULT);
        }
        catch(Exception e){
            Log.d("Exception3",e.toString());
        }
        return "";
    }


}