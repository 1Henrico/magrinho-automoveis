Como instalar o favicon recebido como anexo

1) Salve a imagem que você anexou no navegador (ou use o arquivo que está no seu sistema) como `favicon.png`.
2) Coloque o arquivo `favicon.png` dentro da pasta `public/` do projeto:

   C:\Users\Henrico\Desktop\crimson-showcase-hub-main\public\favicon.png

3) Reinicie o servidor de desenvolvimento (se estiver rodando) para forçar o navegador a buscar o novo favicon. Se o favicon não atualizar, limpe o cache do navegador ou abra em uma aba anônima.

Com isso, o site usará automaticamente `/favicon.png` conforme referenciado em `index.html`.
