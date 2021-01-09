package com.portfolio.tryone.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.portfolio.tryone.dto.MemberRequestDto;

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
    
    public Member(MemberRequestDto memberRequestDto) {
        this.email = memberRequestDto.getEmail();
        this.password = memberRequestDto.getPassword();
        this.nick = this.email;
	}
}
