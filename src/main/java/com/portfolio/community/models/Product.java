package com.portfolio.community.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.portfolio.community.dto.ItemDto;
import com.portfolio.community.dto.ProductTpriceRequestDto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Product extends Timestamped {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String link;

    @Column(nullable = false)
    private int lprice;

    @Column(nullable = false)
    private int tprice;

    public Product(ItemDto itemDto) {
        this.title = itemDto.getTitle();
        this.image = itemDto.getImage();
        this.link = itemDto.getLink();
        this.lprice = itemDto.getLprice();
        this.tprice = -1;
    }

    public Long update(ItemDto itemDto) {
        this.title = itemDto.getTitle();
        this.image = itemDto.getImage();
        this.link = itemDto.getLink();
        this.lprice = itemDto.getLprice();
        return this.id;
    }

    public Long tpriceUpdate(ProductTpriceRequestDto productTargetRequestDto) {
        System.out.println("tprice : " + this.tprice + " -> " + productTargetRequestDto.getTprice());
        this.tprice = productTargetRequestDto.getTprice();
        return this.id;
    }
}
