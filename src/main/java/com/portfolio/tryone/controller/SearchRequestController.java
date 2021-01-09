package com.portfolio.tryone.controller;

import java.util.List;

import com.portfolio.tryone.dto.ItemDto;
import com.portfolio.tryone.utils.NaverShopSearch;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class SearchRequestController {
    private final NaverShopSearch naverShopSearch;

    @GetMapping("/api/search")
    public List<ItemDto> searchProducts(@RequestParam String query) {
        String response = naverShopSearch.search(query);
        System.out.println(naverShopSearch.fromJSONtoItems(response));
        return naverShopSearch.fromJSONtoItems(response);
    }
}
