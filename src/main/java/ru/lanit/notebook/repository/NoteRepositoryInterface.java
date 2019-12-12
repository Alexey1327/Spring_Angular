package ru.lanit.notebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.lanit.notebook.entity.Note;
import ru.lanit.notebook.entity.User;

import java.util.List;

public interface NoteRepositoryInterface extends JpaRepository<Note, Long> {

    @Query(value = "SELECT n FROM Note n WHERE n.user = :user")
    List<Note> findAllByUser(@Param("user") User user);

}
