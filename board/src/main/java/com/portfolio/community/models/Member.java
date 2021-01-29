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
public class Member extends Timestamped {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String nick;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    public Member(Map<String, Object> param) {
        this.email = (String) param.get("email");
        this.password = (String) param.get("password");
        this.nick = this.email;
    }

    public Long update(Map<String, Object> param) {
        if (param.get("password") != null && param.get("password") != "") {
            this.password = (String) param.get("password");
        }
        if (param.get("nick") != null && param.get("nick") != "") {
            this.nick = (String) param.get("nick");
        }
        System.out.println("update user info");
        System.out.println(this.id);
        System.out.println(this.nick);
        System.out.println(this.email);
        System.out.println(this.password);
        return this.id;
    }
}
