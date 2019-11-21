package ru.lanit.angulardemo.notebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.lanit.angulardemo.notebook.entity.Note;

public interface NoteRepositoryInterface extends JpaRepository<Note, Long> {


}
