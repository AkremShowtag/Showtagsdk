package com.tvapp.showtagtv;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.squareup.okhttp.Call;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

public class Login extends Activity {
    ArrayList<ProgramModel> list = new ArrayList<ProgramModel>();
    private Button btn;
    private EditText editText;


    OkHttpClient client = new OkHttpClient();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        btn = findViewById(R.id.button2);
        editText = findViewById(R.id.contentId);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String id = editText.getText().toString();
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Log.d("one","two");
                            whenGetRequest_thenCorrect(id);

                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        });

    }

    public void whenGetRequest_thenCorrect(String id) throws IOException {
        Request request = new Request.Builder()
                .url("https://tagapi.azurewebsites.net/api/Program/All/"+id)
                .build();
        Response response = client.newCall(request).execute();


        if(response.code()==200){
            String value = "{\"arr\":"+response.body().string()+"}";
            try {

                Log.d("hello",value);
            JSONObject ob = new JSONObject(value);
            JSONArray jsonArray = ob.getJSONArray("arr");
            for(int i=0;i<jsonArray.length();i++){
                JSONObject object = jsonArray.getJSONObject(i);
                Integer test = object.getInt("id_program_activationState");
                if(test==1){
                    String img = object.getString("ProgramPoster");
                    String name = object.getString("ProgramName");
                    String programCode = object.getString("ProgramCode");
                    list.add(new ProgramModel(img,name,programCode));
                }
            }
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Log.d("works","works");
                    Intent intent = new Intent(getApplicationContext(),Listofprograms.class);
                    intent.putExtra("Object",list);
                    intent.putExtra("clientId",id);
                    startActivity(intent);
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }}
}