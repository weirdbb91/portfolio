package com.portfolio.community.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    public List<Post> findByBoardId(Long boardId);
}
