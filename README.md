# Movies App (Frontend)

--для запуску фронту

1. підніміть бек - https://hub.docker.com/r/webbylabhub/movies (docker run --name movies -p 8000:8000 webbylabhub/movies)
2. docker pull aserbs/movies:latest
3. docker run --name movies -p 5173:5173 -e API_URL=http://localhost:8000/api/ aserbs/movies:latest
   далі переходите на localhost:5173

--якщо программа не запустилась однією командою докера

можете підняти дев вручну

1. git clone https://github.com/aserbs/test-task-webbylab.git
2. Для використання API_URL треба зробити .env файл із змінною VITE_API_URL
3. npm install
4. npm run dev
   -- також потрібно підняти образ беку https://hub.docker.com/r/webbylabhub/movies

пояснення архітектури:
-роутінг зроблено за допогою tanstack-router
-для зберігання массиву з фільмами використав Redux
-написано 2 сервіси для запитів на бек: login.service та movie.service.
вони використовують інстанс аксіосу в котрому задано токен авторизації та отримується апі_юрл з .енв
