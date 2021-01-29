package com.portfolio.community.controller;

import java.util.List;
import java.util.Map;

import com.portfolio.community.models.Post;
import com.portfolio.community.models.PostRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class PostRestController {
    private final PostRepository PostRepository;

    
    @PostMapping("/api/posts")
    public Post postPost(@RequestBody Map<String, Object> param) {
        return PostRepository.save(new Post(param));
    }
    
    @GetMapping("/api/posts/{boardId}")
    public List<Post> getPostsByBoardId(@PathVariable Long boardId) {
        return PostRepository.findByBoardId(boardId);
    }
    
    @Transactional
    @PutMapping("/api/posts")
    public Long updatePost(@RequestBody Map<String, Object> param) {
        int id = (int) param.get("id");
        Post Post = PostRepository.findById((long) id).get();
        return Post.update(param);
    }
    
    @Transactional
    @DeleteMapping("/api/posts")
    public Long DeletePost(@RequestParam Long id) {
        PostRepository.deleteById(id); 
        return id;
    }
}
