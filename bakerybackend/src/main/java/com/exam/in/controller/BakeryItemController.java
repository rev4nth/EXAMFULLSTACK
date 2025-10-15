package com.exam.in.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.in.model.BakeryItem;
import com.exam.in.service.BakeryItemService;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")

public class BakeryItemController {

    @Autowired
    private BakeryItemService service;

    @GetMapping
    public List<BakeryItem> getAllItems() {
        return service.getAllItems();
    }

    @GetMapping("/{id}")
    public BakeryItem getItemById(@PathVariable Long id) {
        return service.getItemById(id);
    }

    @PostMapping
    public BakeryItem addItem(@RequestBody BakeryItem item) {
        return service.addItem(item);
    }

    @PutMapping("/{id}")
    public BakeryItem updateItem(@PathVariable Long id, @RequestBody BakeryItem item) {
        return service.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        return service.deleteItem(id);
    }
}
