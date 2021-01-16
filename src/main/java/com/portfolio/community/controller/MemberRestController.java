package com.portfolio.community.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.portfolio.community.models.Member;
import com.portfolio.community.models.MemberRepository;
import com.portfolio.community.services.MemberService;
import com.portfolio.community.utils.EmailSender;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberRestController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final EmailSender emailSender;

    
    @PostMapping("/api/members")
    public Member join(@RequestBody Map<String, Object> param) {
        if (param.get("email") == null || param.get("password") == null) {
            return null;
        }
        return memberRepository.save(new Member(param));
    }
    
    @GetMapping("/api/members")
    public Member getMember(@RequestParam Long id) {
        return memberRepository.findById(id).get();
    }
    
    @Transactional
    @PutMapping("/api/members")
    public Long update(@RequestBody Map<String, Object> param) {
        System.out.println(param.toString());
        Member member = memberRepository.findByEmail((String) param.get("email"));
        return member.update(param);
    }
    
    @Transactional
    @DeleteMapping("/api/members")
    public Long DeleteMember(@RequestParam Long id) {
        memberRepository.deleteById(id); 
        return id;
    }
    
    @GetMapping("/api/members/nicks")
    public List<String> getNicks() {
        return memberRepository.findAll().stream().map(m -> m.getNick()).collect(Collectors.toList());
    }

    @PostMapping("/api/login")
    public Long login(@RequestBody Map<String, Object> param) {
        return memberService.loginSuccess(param);
    }

    @PostMapping("/api/verify")
    public String sendCode(@RequestBody Map<String, Object> param) {
        return emailSender.getVerifyCode(param);
    }
}
