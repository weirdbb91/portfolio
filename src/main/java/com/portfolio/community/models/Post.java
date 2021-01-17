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
public class Post extends Timestamped {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long boardId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String status;

    public Post(Map<String, Object> param) {
        System.out.println("new post info");
        int mId = (int) param.get("memberId");
        this.memberId = (long) mId;        
        int bId = (int) param.get("boardId");
        this.boardId = (long) bId;
        this.title = (String) param.get("title");
        this.content = (String) param.get("content");
        this.status = (String) param.get("status");

        System.out.println(this.memberId);
        System.out.println(this.boardId);
        System.out.println(this.status);
        System.out.println(this.content);
        System.out.println(this.title);
    }

    public Long update(Map<String, Object> param) {
        System.out.println("update post info");

        if (param.get("title") != null && param.get("title") != "") {
            this.title = (String) param.get("title");
        }
        if (param.get("content") != null && param.get("content") != "") {
            this.content = (String) param.get("content");
        }        
        if (param.get("status") != null && param.get("status") != "") {
            this.status = (String) param.get("status");
        }

        System.out.println(this.id);
        System.out.println(this.memberId);
        System.out.println(this.boardId);
        System.out.println(this.status);
        System.out.println(this.content);
        System.out.println(this.title);
        return this.id;
    }
}
