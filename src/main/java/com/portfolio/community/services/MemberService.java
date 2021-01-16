package com.portfolio.community.services;

import java.util.Map;

import com.portfolio.community.models.Member;
import com.portfolio.community.models.MemberRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public Long loginSuccess(Map<String, Object> param) {
        if (memberRepository.findAll().stream().noneMatch(m -> m.getEmail().equals((String) param.get("email")))) {
            return 0L;
        }
        Member member = memberRepository.findByEmail((String) param.get("email"));
        return member.getPassword().equals((String) param.get("password")) ? member.getId() : -1L;
    }
}
