package com.portfolio.community.models;

import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Post extends Content {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String postName;

    public Post(Map<String, Object> param) {
        this.setMemberId((Long) param.get("memberId"));
        this.setStatus((String) param.get("status"));
        this.setContent((String) param.get("content"));

        this.postName = (String) param.get("postName");

        System.out.println("new post info");
        System.out.println(this.getMemberId());
        System.out.println(this.getStatus());
        System.out.println(this.getContent());
        System.out.println(this.id);
        System.out.println(this.postName);
    }

    public Long update(Map<String, Object> param) {

        if (param.get("status") != null && param.get("status") != "") {
            this.setStatus((String) param.get("status"));
        }
        if (param.get("content") != null && param.get("content") != "") {
            this.setContent((String) param.get("content"));
        }        
        if (param.get("postName") != null && param.get("postName") != "") {
            this.postName = (String) param.get("postName");
        }

        System.out.println("update post info");
        System.out.println(this.getMemberId());
        System.out.println(this.getStatus());
        System.out.println(this.getContent());
        System.out.println(this.id);
        System.out.println(this.postName);
        return this.id;
    }
}
