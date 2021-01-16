package com.portfolio.community.dto;

import org.json.JSONObject;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductTpriceRequestDto {
    private int tprice;

    public ProductTpriceRequestDto(JSONObject itemJson) {
        this.tprice = itemJson.getInt("tprice");
    }
}
