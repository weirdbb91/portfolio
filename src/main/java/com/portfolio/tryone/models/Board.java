package com.portfolio.tryone.models;

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
public class Board extends Content {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String boardName;

    public Board(Map<String, Object> param) {
        this.setMemberId((Long) param.get("memberId"));
        this.setStatus((String) param.get("status"));
        this.setContent((String) param.get("content"));

        this.boardName = (String) param.get("boardName");

        System.out.println("new board info");
        System.out.println(this.getMemberId());
        System.out.println(this.getStatus());
        System.out.println(this.getContent());
        System.out.println(this.id);
        System.out.println(this.boardName);
    }

    public Long update(Map<String, Object> param) {

        if (param.get("status") != null && param.get("status") != "") {
            this.setStatus((String) param.get("status"));
        }
        if (param.get("content") != null && param.get("content") != "") {
            this.setContent((String) param.get("content"));
        }        
        if (param.get("boardName") != null && param.get("boardName") != "") {
            this.boardName = (String) param.get("boardName");
        }

        System.out.println("update board info");
        System.out.println(this.getMemberId());
        System.out.println(this.getStatus());
        System.out.println(this.getContent());
        System.out.println(this.id);
        System.out.println(this.boardName);
        return this.id;
    }
}
