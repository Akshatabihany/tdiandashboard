
                <% for(var index = 0 ; index < 2 ; index++) { %>
                    <tr>
                         <td><%= arrayoftitle[index] %></td>
                    </tr>
             <% } %>
             <!DOCTYPE html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
                 <title>Document</title>
             </head>
             <body>
                 <form action="/display" method="POST">
                     <input type="text" name="name" placeholder="Name">
                     <input type="submit">
                     <tr>
                         <% for(var jindex = 0 ; jindex <3 ; jindex++) { %>
                         <label name="name" for=""><td> <%= nme %> </td> </label> 
                         <label name="name" for=""><td> <%= title %> </td> </label> 
                         <label name="name" for=""><td> <%= deadline %> </td> </label> 
                         <label name="name" for=""><td> <%= description %> </td> </label> 
                         <label name="name" for=""><td> <%= percentage %> </td> </label> 
                         <ul>
             
             <% for(var index = 0 ; index < 2 ; index++) { %>
                    <tr>
                         <td><%= arrayoftitle[index] %></td>
                    </tr>
             <% } %>
                          <% } %>
             
                        </ul>
             <div class="w3-border">
                 <div class="w3-grey" style="height:24px;width:55px"></div>
               </div>
                 </form>   
             </body>
             </html>