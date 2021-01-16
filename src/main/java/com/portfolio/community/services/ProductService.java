package com.portfolio.community.services;

import com.portfolio.community.dto.ItemDto;
import com.portfolio.community.dto.ProductTpriceRequestDto;
import com.portfolio.community.models.Product;
import com.portfolio.community.models.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository repository;

    @Transactional
    public Long updateTprice(Long id, ProductTpriceRequestDto productTargetRequestDto) {
        Product product = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디는 존재하지 않습니다."));
        return product.tpriceUpdate(productTargetRequestDto);
    }

    @Transactional
    public Long updateBySearch(Long id, ItemDto itemDto) {
        Product product = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디는 존재하지 않습니다."));
        return product.update(itemDto);
    }
}
