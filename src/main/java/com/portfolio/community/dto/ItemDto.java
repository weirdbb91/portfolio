package com.portfolio.community.dto;

import org.json.JSONObject;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private String title;
    private String link;
    private String image;
    private String mallName;
    private String productId;
    private String brand;
    private String maker;
    private String category1;
    private String category2;
    private String category3;
    private String category4;
    private int lprice;
    private Long id;

    public ItemDto(JSONObject itemJson) {
        this.title = itemJson.getString("title");
        this.link = itemJson.getString("link");
        this.image = itemJson.getString("image");
        this.mallName = itemJson.getString("mallName");
        this.productId = itemJson.getString("productId");
        this.brand = itemJson.getString("brand");
        this.maker = itemJson.getString("maker");
        this.category1 = itemJson.getString("category1");
        this.category2 = itemJson.getString("category2");
        this.category3 = itemJson.getString("category3");
        this.category4 = itemJson.getString("category4");
        this.lprice = itemJson.getInt("lprice");
    }
}
