 <ul class="nav nav-pills nav-fill">
     <li class="nav-item">
         <a class="nav-link {{\Route::is('home') ? 'active' : '' }}" href="/home">دشبورد  </a>
     </li>
     <li class="nav-item">
         <a class="nav-link {{\Route::is('users') ? 'active' : '' }}" href="/admin/users">کارمندان</a>
     </li>
     <li class="nav-item">
         <a class="nav-link {{\Route::is('centers') ? 'active' : '' }}" href="/admin/centers">مراکز</a>
     </li>
     <li class="nav-item">
         <a class="nav-link {{\Route::is('templates') ? 'active' : '' }}" href="/admin/templates">تمپلیت روز های کاری مراکز</a>
     </li>
     <li class="nav-item">
         <a class="nav-link {{\Route::is('reports') ? 'active' : '' }}" href="">راپور ها</a>
     </li>
     <li class="nav-item">
         <a class="nav-link {{\Route::is('/') ? 'active' : '' }}" href="/logout"> خروج</a>
     </li>

    
     
 </ul>
