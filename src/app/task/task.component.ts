import { Component, Input } from '@angular/core';
import { Content } from '../models/responseApi';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() tasks!: Content[]
}
