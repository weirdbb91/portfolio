package com.portfolio.tryone.controller;

import java.util.Map;

import com.portfolio.tryone.models.Member;
import com.portfolio.tryone.models.MemberRepository;
import com.portfolio.tryone.services.MemberService;
import com.portfolio.tryone.utils.EmailSender;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberRestController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final EmailSender emailSender;


    @PostMapping("/api/login")
    public Long login(@RequestBody Map<String, Object> param) {
        return memberService.loginSuccess(param);
    }

    @PostMapping("/api/verify")
    public String sendCode(@RequestBody Map<String, Object> param) {
        return emailSender.getVerifyCode(param);
    }
    
    @GetMapping("/api/members")
    public Member getMember(@PathVariable Long id) {
        return memberRepository.findById(id).get();
    }

    @PostMapping("/api/members")
    public Member join(@RequestBody Map<String, Object> param) {
        if (param.get("email") == null || param.get("password") == null) {
            return null;
        }
        return memberRepository.save(new Member(param));
    }

    @Transactional
    @PutMapping("/api/members")
    public Long update(@RequestBody Map<String, Object> param) {
        System.out.println(param.toString());
        Member member = memberRepository.findByEmail((String) param.get("email"));
        return member.update(param);
    }
}
