package com.tvapp.showtagtv;

import java.io.Serializable;

public class ProgramModel implements Serializable {

    private String imageUrl;
    private String name;
    private String programCode;

    public ProgramModel(String imageUrl, String name,String programCode) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.programCode = programCode;
    }

    public String getProgramCode() {
        return programCode;
    }

    public void setProgramCode(String programCode) {
        this.programCode = programCode;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
