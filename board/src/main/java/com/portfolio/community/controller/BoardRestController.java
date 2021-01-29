package com.portfolio.community.controller;

import java.util.List;
import java.util.Map;

import com.portfolio.community.models.Board;
import com.portfolio.community.models.BoardRepository;

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
public class BoardRestController {
    private final BoardRepository BoardRepository;

    
    @PostMapping("/api/boards")
    public Board postBoard(@RequestBody Map<String, Object> param) {
        return BoardRepository.save(new Board(param));
    }
    
    @GetMapping("/api/boards")
    public List<Board> getBoards() {
        return BoardRepository.findAll();
    }

    @GetMapping("/api/boards/{id}")
    public Board getBoardById(@PathVariable Long id) {
        return BoardRepository.findById(id).get();
    }
    
    @Transactional
    @PutMapping("/api/boards")
    public Long updateBoard(@RequestBody Map<String, Object> param) {
        int id = (int) param.get("id");
        Board Board = BoardRepository.findById((long) id).get();
        return Board.update(param);
    }
    
    @Transactional
    @DeleteMapping("/api/boards")
    public Long DeleteBoard(@RequestParam Long id) {
        BoardRepository.deleteById(id); 
        return id;
    }
}
