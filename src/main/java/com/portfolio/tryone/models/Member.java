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
        this.password = param.get("password") == null ? this.password : (String) param.get("password");
        this.nick = param.get("nick") == null ? this.nick : (String) param.get("nick");
        return this.id;
    }
}
