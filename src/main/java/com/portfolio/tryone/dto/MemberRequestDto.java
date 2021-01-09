package com.portfolio.tryone.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequestDto {
    private String nick;
    private String email;
    private String password;
}
