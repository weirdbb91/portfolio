package com.portfolio.community.controller;

import java.util.List;

import com.portfolio.community.dto.ItemDto;
import com.portfolio.community.dto.ProductTpriceRequestDto;
import com.portfolio.community.models.Product;
import com.portfolio.community.models.ProductRepository;
import com.portfolio.community.services.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ProductRestController {
    private final ProductRepository productRepository;
    private final ProductService productService;

    @PostMapping("/api/products")
    public Product createMyProduct(@RequestBody ItemDto itemDto) {
        return productRepository.save(new Product(itemDto));
    }

    @GetMapping("/api/products")
    public List<Product> searchMyProducts() throws InterruptedException {
        return productRepository.findAll();
    }

    // 관심 상품에 관심 가격 등록
    @PutMapping("/api/products/{id}")
    public Long updateMyProduct(@PathVariable Long id, @RequestBody ProductTpriceRequestDto productTpriceRequestDto) {
        return productService.updateTprice(id, productTpriceRequestDto);
    }

    @DeleteMapping("/api/products")
    public Long deleteProduct(@RequestParam Long id) {
        productRepository.deleteById(id);
        return id;
    }
}
