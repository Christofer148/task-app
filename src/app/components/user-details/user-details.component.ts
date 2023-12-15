import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../service/user/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [UserService],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  errorMessage: string = ""

  user?: User

  constructor(private userService: UserService){
    this.userService.getUser(7).subscribe({
      next: (userData) => {
        this.user = userData
      },

      error: (errData) => {
        this.errorMessage = errData
      },
      complete: () => {
        console.info("User Data ok")
      }
    })  
  }

}
