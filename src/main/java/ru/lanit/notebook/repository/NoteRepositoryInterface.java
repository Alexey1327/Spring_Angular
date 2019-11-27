package ru.lanit.notebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lanit.notebook.entity.Note;

public interface NoteRepositoryInterface extends JpaRepository<Note, Long> {


}
