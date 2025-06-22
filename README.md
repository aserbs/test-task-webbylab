# Movies App (Frontend)

--для запуску фронту

1. підніміть бек - https://hub.docker.com/r/webbylabhub/movies
2. docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 aserbs/movies

--якщо программа не запустилась однією командою докера

можете підняти дев вручну
-- Для використання API_URL треба зробити .env файл із змінною VITE_API_URL
-- npm install
-- npm run dev
-- також потрібно підняти образ беку https://hub.docker.com/r/webbylabhub/movies

пояснення архітектури:
-роутінг зроблено за допогою tanstack-router
-для зберігання массиву з фільмами використав Redux
-написано 2 сервіси для запитів на бек: login.service та movie.service.
вони використовують інстанс аксіосу в котрому задано токен авторизації та отримується апі_юрл з .енв
