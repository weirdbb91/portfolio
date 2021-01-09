package com.portfolio.tryone.controller;

import com.portfolio.tryone.dto.MemberRequestDto;
import com.portfolio.tryone.models.Member;
import com.portfolio.tryone.models.MemberRepository;
import com.portfolio.tryone.utils.EmailSender;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberRestController {
    private final MemberRepository memberRepository;
    private final EmailSender emailSender;

    @GetMapping("/api/verify")
    public String getRequestForm(@RequestParam String email) {
        // 중복 검사
        if (memberRepository.findAll().stream().anyMatch(m -> m.getEmail().equals(email))) {
            return "[Info] Existing member email";
        }
        return emailSender.getVerifyCode(email);
    }

    @PostMapping("/api/members")
    public Member signIn(@RequestBody MemberRequestDto memberRequestDto) {
        System.out.println(memberRequestDto.toString());
        return memberRepository.save(new Member(memberRequestDto));
    }

}
