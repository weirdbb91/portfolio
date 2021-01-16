package com.portfolio.community.utils;

import java.util.ArrayList;
import java.util.List;

import com.portfolio.community.dto.ItemDto;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NaverShopSearch {
    public String search(String query) {
        // REST 양식
        RestTemplate rest = new RestTemplate();

        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Naver-Client-Id", "DiCzTmBgaMLjEryCGJIW");
        headers.add("X-Naver-Client-Secret", "gAynQ7UnHa");
        String body = "";

        // entity 요청 양식 완성
        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);

        // 요청과 응답 교환
        ResponseEntity<String> responseEntity = rest.exchange(
                "https://openapi.naver.com/v1/search/shop.json?query=" + query, HttpMethod.GET, requestEntity,
                String.class);

        // http 상태 코드
        HttpStatus httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value();
        System.out.println("Response status: " + status);

        // 응답
        String response = responseEntity.getBody();
        System.out.println(response);
        return response;
    }

    public List<ItemDto> fromJSONtoItems(String response) {
        // 문자열을 JSON 양식으로 변환
        JSONObject rjson = new JSONObject(response);

        // JSON 양식 내 "items" 항목 값을 배열 형태로 변환
        JSONArray items = rjson.getJSONArray("items");

        // Returning Type Pattern 반환 양식
        List<ItemDto> ret = new ArrayList<>();
        for (int i = 0; i < items.length(); i++) {
            JSONObject itemJson = (JSONObject) items.get(i);
            // System.out.println(itemJson);
            ItemDto itemDto = new ItemDto(itemJson);
            ret.add(itemDto);
        }
        return ret;
    }
}
