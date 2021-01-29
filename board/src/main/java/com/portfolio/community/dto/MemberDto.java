package com.portfolio.community.dto;

import com.portfolio.community.models.Member;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String nick;
    private String email;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.nick = member.getNick();
        this.email = member.getEmail();
    }
}
