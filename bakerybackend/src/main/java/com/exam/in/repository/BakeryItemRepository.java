package com.exam.in.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.in.model.*;

public interface BakeryItemRepository extends JpaRepository<BakeryItem, Long> {

}
