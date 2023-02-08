package com.showtag.sdk;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.ui.SimpleExoPlayerView;

import java.util.ArrayList;
import java.util.Objects;

public class Showtag {


    public WebView webView;
    public SimpleExoPlayer exoPlayer;
    public SimpleExoPlayerView exoPlayerView;
    public ImageView cart;
    public String videoURL;
    public Context context;

    public static final Integer KEY_UP = 19;
    public static final Integer KEY_LEFT = 21;
    public static final Integer KEY_RIGHT = 22;
    public static final Integer KEY_DOWN = 20;
    public static final Integer KEY_IN = 23;

    LinearLayout.LayoutParams param,param2 ;

    public int RSelected = 3999;
    public int CSelected = 0;

    public String IdSelected;
    public String OldSelected;
    public static boolean  isPaused = false;
    public static boolean isCloseFocused = false;



    public static ArrayList<String> Products,Celebrities = new ArrayList<>();
    public static String[][] navMatrix = new String[4000][4000];
    public static String[][] navMatrix2 = new String[4000][4000];





    public Showtag(WebView webView, SimpleExoPlayer exoPlayer, SimpleExoPlayerView exoPlayerView, ImageView cart, String videoURL, String programCode, Context context) {
        this.webView = webView;
        this.exoPlayer = exoPlayer;
        this.cart = cart;
        this.videoURL = videoURL;
        this.exoPlayerView = exoPlayerView;
        this.context = context;



       // navMatrix[0][0] = "ButtonCelebrity";
       // navMatrix[0][1] = "ButtonProduct";
        //navMatrix[3998][0] = "Cart";
        navMatrix[3999][0] = "Pause";

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

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setSafeBrowsingEnabled(false);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.getSettings().setPluginState(WebSettings.PluginState.ON_DEMAND);
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
        webView.addJavascriptInterface(new JSProtocol(context,cart),"JSProtocol");


        if (Build.VERSION.SDK_INT >= 21) {
            webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);
        }

        if (Build.VERSION.SDK_INT < 16) {
            webView.setBackgroundColor(0x00000000);
        } else {
            webView.setBackgroundColor(Color.argb(1, 0, 0, 0));
        }

        webView.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    view.loadUrl(request.getUrl().toString());
                }
                return super.shouldOverrideUrlLoading(view, request);
            }

            @Override
            public void onPageStarted(WebView webview, String url, Bitmap favicon) {
                super.onPageStarted(webview, url, favicon);
                webview.setVisibility(View.INVISIBLE);
            }

            @Override
            public void onPageFinished(WebView webview, String url) {

                webview.setVisibility(View.INVISIBLE);
                Log.d("seeer","s");
                webview.loadUrl("javascript:var video = videojs('my-player_html5_api');");
                webview.loadUrl("javascript:const startEvent = new CustomEvent('test',{'detail':{'studio':true,'designer':false,'url':"+"'"+videoURL+ "'"+",'videoId':"+"'"+programCode+"','width':'960px','idUser':'testuser'}} ); document.dispatchEvent(startEvent);");
                //webView.loadUrl("javascript:Player.play();");
                Log.d("play","webview.loadUrl(javascript:const startEvent = new CustomEvent('test',{'detail':{'studio':true,'url':+'"+videoURL+"'+,'videoId':+'"+programCode+"','width':'960px','idUser':'testuser'}} ); document.dispatchEvent(startEvent););");
                //Log.d("player","{'detail':{'studio':true,'url':\"+\"'\"+videoURL+ \"'\"+\",'videoId':\"+\"'\"+programCode+\"','width':'960px','idUser':'testuser'}}");
                super.onPageFinished(webview, url);

            }
        });
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d("MyApplication", consoleMessage.message() + " -- From line "
                        + consoleMessage.lineNumber() + " of "
                        + consoleMessage.sourceId());
                return super.onConsoleMessage(consoleMessage);
            }
        });
        webView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17");

        webView.loadUrl("file:///android_asset/akrem/player.html");
        webView.requestFocus();
        webView.getSettings().setLightTouchEnabled(true);

        /*cart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                takeScreenshot(context);

                 webView.loadUrl("javascript:var amss = document.getElementById('my-player_html5_api'); amss.hidden=true;  ");
                webView.loadUrl("javascript:var event = new Event('start'); document.dispatchEvent(event); ");

            }
        });*/
    }

    private void takeScreenshot(Context cn,String url) {
        webView.setVisibility(View.VISIBLE);
        webView.setLayoutParams(param);
        exoPlayerView.setVisibility(View.INVISIBLE);
        exoPlayerView.setLayoutParams(param2);
        long time = exoPlayer.getCurrentPosition()/1000;
        webView.loadUrl("javascript:var event = new CustomEvent('showtag',{'detail':{'time':'"+time+"','image':'"+url+"'}}); document.dispatchEvent(event); ");
        //webView.loadUrl("javascript:var event = new Event('start'); document.dispatchEvent(event); ");



    }

    public boolean navigation(KeyEvent event,boolean returnStatment){
        Log.d("event",String.valueOf(event.getKeyCode()));
        if(Showtag.isCloseFocused){
            if(event.getKeyCode()==Showtag.KEY_IN && event.getAction() == KeyEvent.ACTION_DOWN){
                webView.loadUrl("javascript:var clicking = new CustomEvent('PClick',{'detail':{'clickname':'"+"CloseIt"+"'}} ); document.dispatchEvent(clicking);");
                Showtag.isCloseFocused= false;
            }
        }
        else if(Showtag.isPaused){

            int _RSelected = RSelected;
            int _CSelected = CSelected;
            if(event.getKeyCode()==Showtag.KEY_UP && event.getAction() == KeyEvent.ACTION_DOWN){
                Log.d("selection","up");
                Log.d("selevtion",String.valueOf(_RSelected));
                for(int i = _RSelected-1;i>=0;i--){
                    // Log.d("rselected",String.valueOf(RSelected));
                    //if (i==RSelected) continue;
                    // Log.d("i is", String.valueOf(i));
                    for(int j=0;j<=3999;j++){
                        // Log.d("j is", String.valueOf(j));
                        if(Showtag.navMatrix[i][j] !=null){
                            Log.d("i",String.valueOf(i));
                            Log.d("j",String.valueOf(j));
                            RSelected = i;
                            CSelected = j;
                            OldSelected = IdSelected;
                            IdSelected = Showtag.navMatrix[i][j];
                            webView.loadUrl("javascript:var cusfocus = new CustomEvent('customFocus',{'detail':{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'}} ); document.dispatchEvent(cusfocus);");
                            Log.d("selection",IdSelected);
                            if(Objects.equals(IdSelected, "Cart")){
                                Utils.runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        Log.d("hello",IdSelected);
                                        cart.setBackgroundColor(Color.RED);
                                    }
                                });

                            }
                            if(Objects.equals(OldSelected, "Cart")){
                                Utils.runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        cart.setBackgroundColor(Color.TRANSPARENT);

                                    }
                                });
                            }
                            Log.d("comm","javascript:var cusfocus = new CustomEvent('customFocus',d{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'} ); document.dispatchEvent(cusfocus);\"");
                            break;

                        }

                    }
                    if(RSelected != _RSelected|| CSelected != _CSelected){
                        _CSelected = CSelected;
                        _RSelected = RSelected;
                        break;
                    }
                }
            }else if(event.getKeyCode()==Showtag.KEY_LEFT && event.getAction() == KeyEvent.ACTION_DOWN ) {
                Log.d("selection","left");

                for(int k=CSelected-1;k>=0;k--){
                    if(Showtag.navMatrix[RSelected][k] !=null){
                        CSelected = k;
                        OldSelected = IdSelected;
                        IdSelected = Showtag.navMatrix[RSelected][k];
                        webView.loadUrl("javascript:var cusfocus = new CustomEvent('customFocus',{'detail':{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'}} ); document.dispatchEvent(cusfocus);");
                        Log.d("selection",IdSelected);
                        if(Objects.equals(IdSelected, "Cart")){
                            Utils.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    cart.setBackgroundColor(Color.RED);
                                }
                            });

                        }
                        if(Objects.equals(OldSelected, "Cart")){
                            Utils.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    cart.setBackgroundColor(Color.TRANSPARENT);

                                }
                            });
                        }
                        break;

                    }
                }
                if(_CSelected == CSelected){
                    for(int i = _RSelected-1;i>=0;i--){
                        // Log.d("rselected",String.valueOf(RSelected));
                        //if (i==RSelected) continue;
                        // Log.d("i is", String.valueOf(i));
                        for(int j=0;j<=3999;j++){
                            // Log.d("j is", String.valueOf(j));
                            if(Showtag.navMatrix[i][j] !=null){
                                RSelected = i;
                                CSelected = j;
                                OldSelected = IdSelected;
                                IdSelected = Showtag.navMatrix[i][j];
                                webView.loadUrl("javascript:var cusfocus = new CustomEvent('customFocus',{'detail':{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'}} ); document.dispatchEvent(cusfocus);");
                                Log.d("selection",IdSelected);
                                if(Objects.equals(IdSelected, "Cart")){
                                    Utils.runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            cart.setBackgroundColor(Color.RED);
                                        }
                                    });

                                }
                                if(Objects.equals(OldSelected, "Cart")){
                                    Utils.runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            cart.setBackgroundColor(Color.TRANSPARENT);

                                        }
                                    });
                                }
                                break;

                            }

                        }
                        if(RSelected != _RSelected|| CSelected != _CSelected){
                            _CSelected = CSelected;
                            _RSelected = RSelected;
                            break;
                        }
                    }}

            }else  if(event.getKeyCode()==Showtag.KEY_RIGHT && event.getAction() == KeyEvent.ACTION_DOWN){
                Log.d("selection",String.valueOf(CSelected));
                for(int k=CSelected+1;k<=3999;k++){
                    if(Showtag.navMatrix[RSelected][k] !=null){
                        CSelected = k;
                        OldSelected = IdSelected;
                        IdSelected = Showtag.navMatrix[RSelected][k];
                        webView.loadUrl("javascript:var cusfocus = new CustomEvent('customFocus',{'detail':{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'}} ); document.dispatchEvent(cusfocus);");
                        Log.d("selection",IdSelected);
                        if(Objects.equals(IdSelected, "Cart")){
                            Utils.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    cart.setBackgroundColor(Color.RED);
                                }
                            });

                        }
                        if(Objects.equals(OldSelected, "Cart")){
                            Utils.runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    cart.setBackgroundColor(Color.TRANSPARENT);

                                }
                            });
                        }
                        break;

                    }
                }
                if(_CSelected == CSelected){
                    for(int i = _RSelected+1;i<=3999;i++){
                        // Log.d("rselected",String.valueOf(RSelected));
                        //if (i==RSelected) continue;
                        // Log.d("i is", String.valueOf(i));
                        for(int j=0;j<=3999;j++){
                            // Log.d("j is", String.valueOf(j));
                            if(Showtag.navMatrix[i][j] !=null){
                                RSelected = i;
                                CSelected = j;
                                OldSelected = IdSelected;
                                IdSelected = Showtag.navMatrix[i][j];
                                webView.loadUrl("javascript:var cusfocus = new CustomEvent('customFocus',{'detail':{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'}} ); document.dispatchEvent(cusfocus);");
                                if(Objects.equals(IdSelected, "Cart")){
                                    Utils.runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            cart.setBackgroundColor(Color.RED);
                                        }
                                    });

                                }
                                if(Objects.equals(OldSelected, "Cart")){
                                    Utils.runOnUiThread(new Runnable() {
                                        @Override
                                        public void run() {
                                            cart.setBackgroundColor(Color.TRANSPARENT);

                                        }
                                    });
                                }
                                Log.d("selection",IdSelected);
                                break;

                            }

                        }
                        if(RSelected != _RSelected|| CSelected != _CSelected){
                            _CSelected = CSelected;
                            _RSelected = RSelected;
                            break;
                        }
                    }}
            }else if(event.getKeyCode()==Showtag.KEY_DOWN && event.getAction() == KeyEvent.ACTION_DOWN){
                Log.d("selection","down");

                for(int i = _RSelected+1;i<=3999;i++){
                    // Log.d("rselected",String.valueOf(RSelected));
                    //if (i==RSelected) continue;
                    // Log.d("i is", String.valueOf(i));
                    for(int j=0;j<=3999;j++){
                        // Log.d("j is", String.valueOf(j));
                        if(Showtag.navMatrix[i][j] !=null){
                            RSelected = i;
                            CSelected = j;
                            OldSelected = IdSelected;
                            IdSelected = Showtag.navMatrix[i][j];
                            webView.loadUrl("javascript:var cusfocus = new CustomEvent('customFocus',{'detail':{'oldFocus':'"+OldSelected+"','newFocus':'"+IdSelected+"'}} ); document.dispatchEvent(cusfocus);");
                            Log.d("selection",IdSelected);
                            if(Objects.equals(IdSelected, "Cart")){
                                Utils.runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        cart.setBackgroundColor(Color.RED);
                                    }
                                });

                            }
                            if(Objects.equals(OldSelected, "Cart")){
                                Utils.runOnUiThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        cart.setBackgroundColor(Color.TRANSPARENT);

                                    }
                                });
                            }
                            break;
                        }
                    }
                    if(RSelected != _RSelected|| CSelected != _CSelected){
                        _CSelected = CSelected;
                        _RSelected = RSelected;
                        break;
                    }
                }
            }else if(event.getKeyCode()==Showtag.KEY_IN && event.getAction() == KeyEvent.ACTION_DOWN){
                // webView.loadUrl("javascript:document.getElementById(\""+IdSelected+"\").click();");
                Showtag.navMatrix2 = Showtag.navMatrix;
                webView.loadUrl("javascript:var clicking = new CustomEvent('PClick',{'detail':{'clickname':'"+IdSelected+"'}} ); document.dispatchEvent(clicking);");
                //Log.d("clicksed","javascript:var clicking = new CustomEvent('PClick',{'detail':{'clickname':'\"+IdSelected+\"'}} ); document.dispatchEvent(clicking);");
                if(IdSelected=="Pause"){
                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            for(int i=0;i<=3999;i++){
                                for(int j=0;j<=3999;j++){
                                    Showtag.navMatrix[i][j]=null;
                                }
                            }
                            Showtag.navMatrix[3999][0] = "Pause";

                        }

                    }).start();

                    Utils.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            exoPlayerView.setVisibility(View.VISIBLE);
                            exoPlayerView.setLayoutParams(param);
                            exoPlayer.setPlayWhenReady(true);
                            //webView.setVisibility(View.INVISIBLE);
                            webView.setLayoutParams(param2);
                        }
                    });
                }
            }
        }else{
            return returnStatment;
        }
        return true;
    }


}
