package com.tvapp.showtagtv;


import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;


public class Listofprograms extends Activity {
    private static final String TAG = "MainActivity";

    //vars
    private ArrayList<String> mNames = new ArrayList<>();
    private ArrayList<String> mImageUrls = new ArrayList<>();
    private ArrayList<String> mProgramCodes = new ArrayList<>();
    private ArrayList<ProgramModel> list = new ArrayList<>();
    private String clientId;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_listofprograms);
        clientId = getIntent().getStringExtra("clientId");
        list = (ArrayList<ProgramModel>) getIntent().getSerializableExtra("Object");
       // Log.d("array",list.get(0).getImageUrl());
        getImages(list);
    }

    private void getImages(ArrayList<ProgramModel> list ){
        //Log.d(TAG, "initImageBitmaps: preparing bitmaps.");
        for(int i=0;i<list.size();i++){
            mImageUrls.add("https://tag2081.blob.core.windows.net/images/"+list.get(i).getImageUrl());
            mNames.add(list.get(i).getName());
            mProgramCodes.add(list.get(i).getProgramCode());
        }
        initRecyclerView();

    }

    private void initRecyclerView(){
        Log.d(TAG, "initRecyclerView: init recyclerview");

        LinearLayoutManager layoutManager = new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false);
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(layoutManager);
        RecyclerViewAdapter adapter = new RecyclerViewAdapter(this, mNames, mImageUrls,mProgramCodes,clientId);
        recyclerView.setAdapter(adapter);
    }
}