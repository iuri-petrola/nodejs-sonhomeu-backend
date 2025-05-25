--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

-- Started on 2025-05-22 11:34:44 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


ALTER SCHEMA public OWNER TO user_nodejs_someu;


COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;


CREATE TABLE public."Cart" (
    id text NOT NULL,
    "userId" text NOT NULL,
    open boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Cart" OWNER TO user_nodejs_someu;


CREATE TABLE public."CartItem" (
    id text NOT NULL,
    "cartId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL
);


ALTER TABLE public."CartItem" OWNER TO user_nodejs_someu;


CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO user_nodejs_someu;



CREATE TABLE public.items (
    id text NOT NULL,
    amount integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    order_id text NOT NULL,
    product_id text NOT NULL
);


ALTER TABLE public.items OWNER TO user_nodejs_someu;


CREATE TABLE public.orders (
    id text NOT NULL,
    "table" integer NOT NULL,
    status boolean DEFAULT false NOT NULL,
    draft boolean DEFAULT true NOT NULL,
    name text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO user_nodejs_someu;


CREATE TABLE public.products (
    id text NOT NULL,
    name text NOT NULL,
    price text NOT NULL,
    description text NOT NULL,
    banner text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    category_id text NOT NULL
);


ALTER TABLE public.products OWNER TO user_nodejs_someu;



CREATE TABLE public.users (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO user_nodejs_someu;


INSERT INTO public.categories (id, name, created_at, updated_at) VALUES ('0d783f97-fd50-4514-aa52-dfb333525129', 'Blusas', '2025-05-16 03:33:21.458', '2025-05-16 03:33:21.458');
INSERT INTO public.categories (id, name, created_at, updated_at) VALUES ('b2d159dc-4be6-40da-aba1-6452c4748eb6', 'vestido', '2025-05-16 03:33:29.25', '2025-05-16 03:33:29.25');


INSERT INTO public.products (id, name, price, description, banner, created_at, updated_at, category_id) VALUES ('78a447b3-7373-45b3-b50e-0aa5e86d231a', 'Blusa Azul', '50', 'Blusa Azul', '0e054d5e6954cb169e92591c9e60b6ff-Azul.png', '2025-05-16 03:34:00.518', '2025-05-16 03:34:00.518', '0d783f97-fd50-4514-aa52-dfb333525129');
INSERT INTO public.products (id, name, price, description, banner, created_at, updated_at, category_id) VALUES ('1261f91f-5104-4738-85f4-190de4274dc3', 'Blusa Verdinha', '60', 'Blusa Verdinha', 'e50c04d54741018dc52aa44021b48370-verdinha.JPG', '2025-05-16 03:34:31.555', '2025-05-16 03:34:31.555', '0d783f97-fd50-4514-aa52-dfb333525129');
INSERT INTO public.products (id, name, price, description, banner, created_at, updated_at, category_id) VALUES ('e1ec0f8b-5699-4a1e-8542-112bc33b2774', 'Blusa Vermelha-branca', '70', 'Blusa Vermelha-branca', 'dbf95d544a68013c068adc96529df413-vermelha-branca.JPG', '2025-05-16 03:35:06.912', '2025-05-16 03:35:06.912', '0d783f97-fd50-4514-aa52-dfb333525129');
INSERT INTO public.products (id, name, price, description, banner, created_at, updated_at, category_id) VALUES ('b3996a5c-6b57-4931-af00-3b3a1e0b73f7', 'Blusa Colorida', '80', 'Blusa Colorida', 'c63bea4418d99145aa9835eefcce764f-colorida.jpeg', '2025-05-16 03:35:35.754', '2025-05-16 03:35:35.754', '0d783f97-fd50-4514-aa52-dfb333525129');
INSERT INTO public.products (id, name, price, description, banner, created_at, updated_at, category_id) VALUES ('9071dd8c-97c2-4657-8a1c-f92ab3e1c0bb', 'Vestido Amarelo', '100', 'Vestido Amarelo', 'a1528f5d782a13380f08d61c1cc6cad1-vestido amarelo.jpg', '2025-05-16 03:36:47.676', '2025-05-16 03:36:47.676', 'b2d159dc-4be6-40da-aba1-6452c4748eb6');
INSERT INTO public.products (id, name, price, description, banner, created_at, updated_at, category_id) VALUES ('abb3f46c-8a45-4c80-864f-133c90b36d7c', 'Vestido Verde', '120', 'Vestido Verde', 'f70f1d13d13bafb20a11ce04a1637cda-vestido verde.jpg', '2025-05-16 03:37:33.287', '2025-05-16 03:37:33.287', 'b2d159dc-4be6-40da-aba1-6452c4748eb6');


INSERT INTO public.users (id, name, email, password, created_at, updated_at) VALUES ('9b7fa3fa-ab18-4982-ae68-05317f1e0348', 'Iuri Petrola', 'iuri.petrola@gmail.com', '$2a$08$jdS1i6DzZHhPh6llH77eP.dkMmObuf1nfl55LggqDZ0AV57sAcZl2', '2025-05-16 03:31:54.689', '2025-05-16 03:31:54.689');


ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);



ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);



CREATE INDEX "Cart_userId_idx" ON public."Cart" USING btree ("userId");


ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


ALTER TABLE ONLY public."CartItem"
    ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


REVOKE USAGE ON SCHEMA public FROM PUBLIC;


