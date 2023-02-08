package com.showtag.sdk;

import android.app.Activity;
import android.content.Context;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.ImageView;

import java.util.logging.Handler;

class JSProtocol {

    Context context;
    ImageView cart;

    public JSProtocol(Context context, ImageView cart) {
        this.context = context;
        this.cart=cart;
    }

    @JavascriptInterface
    public void closeButton(boolean action){
        if(action){
            Showtag.isCloseFocused = action;
        }

    }
    @JavascriptInterface
    public void isPaused(boolean action){
        if(action){
            Utils.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    cart.setVisibility(View.VISIBLE);
                    Showtag.isPaused = true;
                    Log.d("isPaused",String.valueOf(action));
                }
            });
        }else{
            Utils.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Showtag.isPaused = false;
                }
            });


        }
    }

    @JavascriptInterface
    public void Products(String array){
        if(array.length()>0){
            Log.d("produs",array);
            String[] arr = array.split(",");
            for(int i=0;i<arr.length;i++){
                String[] arr2 = arr[i].split("-");

                int a = Integer.parseInt(arr2[2]);
                int b = Integer.parseInt(arr2[1]);

                //Showtag.Products.add(arr2[0]);
                Showtag.navMatrix[a][b] = arr2[0];
            }
            //Log.d("her",Showtag.Products.get(0));
           // Log.d("lengths",String.valueOf(Showtag.Products.size()));
            //Log.d("Prod",array);
        }
    }
    @JavascriptInterface
    public void  Celebrities(String array){
        if(array.length()>0){
            Log.d("array",array);
            String[] arr = array.split(",");
            for(int i=0;i<arr.length;i++){
                String[] arr2 = arr[i].split("-");

                int a = Integer.parseInt(arr2[2]);
                int b = Integer.parseInt(arr2[1]);

                Showtag.Celebrities.add(arr2[0]);
                Log.d("Cel",array);
                Showtag.navMatrix[a][b] = arr2[0];

            }
           // Log.d("he",Showtag.Celebrities.get(0));
           // Log.d("length",String.valueOf(Showtag.Celebrities.size()));
           // Log.d("Cel",array);
        }
    }
    @JavascriptInterface
    public void  ProductList(String array){
        if(array.length()>0){
            String[] arr = array.split(",");
            for(int i=0;i<arr.length;i++){
                String[] arr2 = arr[i].split("-");

                int a = Integer.parseInt(arr2[2]);
                int b = Integer.parseInt(arr2[1]);
                if(i==0){
                    for(int l=0;l<=3999;l++){
                        if(Showtag.navMatrix[a][l]!=null){
                            Showtag.navMatrix[a][l] = null;
                        }
                    }
                }

                // Celebrities.add(arr2[0]);
                Log.d("Celes",array);
                Showtag.navMatrix[a][b] = arr2[0];

            }
            // Log.d("he",Celebrities.get(0));
            // Log.d("length",String.valueOf(Celebrities.size()));
            Log.d("Cel",array);
        }
    }
    @JavascriptInterface
    public void  ButtonsList(String array){
        if(array.length()>0){
            String[] arr = array.split(",");
            for(int i=0;i<arr.length;i++){
                String[] arr2 = arr[i].split("-");

                int a = Integer.parseInt(arr2[2]);
                int b = Integer.parseInt(arr2[1]);

                // Celebrities.add(arr2[0]);
                //Log.d("Cel",array);
                Showtag.navMatrix[a][b] = arr2[0];

            }
            // Log.d("he",Celebrities.get(0));
            // Log.d("length",String.valueOf(Celebrities.size()));
            //Log.d("Cel",array);
        }
    }
}


