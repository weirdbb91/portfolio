package com.portfolio.community.models;

import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class Content extends Timestamped {
    private Long memberId;
    private String status;
    private String content;    
}
