--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

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

--
-- Name: d_ref_type; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.d_ref_type AS character varying(6)
	CONSTRAINT d_ref_type_check CHECK (((VALUE)::text = ANY ((ARRAY['coord'::character varying, 'stop'::character varying])::text[])));


ALTER DOMAIN public.d_ref_type OWNER TO postgres;

--
-- Name: d_route_type; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.d_route_type AS character varying(16)
	CONSTRAINT d_route_type_check CHECK (((VALUE)::text = ANY ((ARRAY['leasttime'::character varying, 'leastinterchange'::character varying, 'leastwalking'::character varying])::text[])));


ALTER DOMAIN public.d_route_type OWNER TO postgres;

--
-- Name: d_speed; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.d_speed AS character varying(6)
	CONSTRAINT d_speed_check CHECK (((VALUE)::text = ANY ((ARRAY['slow'::character varying, 'normal'::character varying, 'fast'::character varying])::text[])));


ALTER DOMAIN public.d_speed OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    favid integer NOT NULL,
    color text NOT NULL,
    icon text NOT NULL,
    title text NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_favid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_favid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_favid_seq OWNER TO postgres;

--
-- Name: favorites_favid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_favid_seq OWNED BY public.favorites.favid;


--
-- Name: favpoints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favpoints (
    ref text NOT NULL,
    type public.d_ref_type NOT NULL,
    favid integer NOT NULL
);


ALTER TABLE public.favpoints OWNER TO postgres;

--
-- Name: favtrips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favtrips (
    orig_ref text NOT NULL,
    orig_type public.d_ref_type NOT NULL,
    dest_ref text NOT NULL,
    dest_type public.d_ref_type NOT NULL,
    exclmeans text,
    changespeed public.d_speed,
    routetype public.d_route_type,
    maxchanges integer,
    favid integer NOT NULL
);


ALTER TABLE public.favtrips OWNER TO postgres;

--
-- Name: plannerentries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plannerentries (
    planid integer NOT NULL,
    title text NOT NULL,
    notification boolean DEFAULT false NOT NULL,
    repeat integer DEFAULT 0 NOT NULL,
    "time" time without time zone NOT NULL,
    dep boolean DEFAULT true NOT NULL,
    orig_ref text NOT NULL,
    orig_type public.d_ref_type NOT NULL,
    dest_ref text NOT NULL,
    dest_type public.d_ref_type NOT NULL,
    exclmeans integer,
    changespeed public.d_speed,
    routetype public.d_route_type,
    maxchanges integer,
    startdate date NOT NULL,
    enddate date,
    userid integer NOT NULL,
    color text NOT NULL,
    CONSTRAINT chk_date CHECK ((startdate < enddate))
);


ALTER TABLE public.plannerentries OWNER TO postgres;

--
-- Name: plannerentries_planid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plannerentries_planid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plannerentries_planid_seq OWNER TO postgres;

--
-- Name: plannerentries_planid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plannerentries_planid_seq OWNED BY public.plannerentries.planid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    colortheme text DEFAULT 'blue'::text NOT NULL,
    darkmode boolean DEFAULT false NOT NULL,
    exclmeans text,
    changespeed public.d_speed,
    routetype public.d_route_type,
    maxchanges integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO postgres;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: favorites favid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favid SET DEFAULT nextval('public.favorites_favid_seq'::regclass);


--
-- Name: plannerentries planid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plannerentries ALTER COLUMN planid SET DEFAULT nextval('public.plannerentries_planid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (favid, color, icon, title, userid) FROM stdin;
33	red	food	Weg 123	1
34	orange	food	Restaurant	1
35	orange	food	Restaurant	1
36	red	food	Weg 123	1
\.


--
-- Data for Name: favpoints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favpoints (ref, type, favid) FROM stdin;
16.32019:48.15985:WGS84	coord	34
16.32019:48.15985:WGS84	coord	35
\.


--
-- Data for Name: favtrips; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favtrips (orig_ref, orig_type, dest_ref, dest_type, exclmeans, changespeed, routetype, maxchanges, favid) FROM stdin;
16.31933:48.16815:WGS84	coord	60201468	stop	\N	slow	leastinterchange	\N	33
16.31933:48.16815:WGS84	coord	60201468	stop	\N	slow	leastinterchange	\N	36
\.


--
-- Data for Name: plannerentries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plannerentries (planid, title, notification, repeat, "time", dep, orig_ref, orig_type, dest_ref, dest_type, exclmeans, changespeed, routetype, maxchanges, startdate, enddate, userid, color) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, email, password, colortheme, darkmode, exclmeans, changespeed, routetype, maxchanges) FROM stdin;
10	new@email.com	$2b$10$XTAjCz.BUnpe26qwlwp1COfLgozIwi2qOsQ6g6be1311GK2JYjNQG	blue	f	\N	\N	\N	\N
1	max.muster@email.com	$2b$10$TjUDuru4UPr9WyUAHgtcquJRrKCE2fyjmp4ZYXTCRMQbxbmvHakPm	blue	f	\N	\N	\N	\N
\.


--
-- Name: favorites_favid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_favid_seq', 36, true);


--
-- Name: plannerentries_planid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plannerentries_planid_seq', 7, true);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 11, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favid);


--
-- Name: plannerentries plannerentries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plannerentries
    ADD CONSTRAINT plannerentries_pkey PRIMARY KEY (planid);


--
-- Name: favpoints unique_fav_points; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favpoints
    ADD CONSTRAINT unique_fav_points UNIQUE (ref, favid);


--
-- Name: favtrips unique_fav_trips; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favtrips
    ADD CONSTRAINT unique_fav_trips UNIQUE (orig_ref, dest_ref, favid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: favpoints fk_fav_points; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favpoints
    ADD CONSTRAINT fk_fav_points FOREIGN KEY (favid) REFERENCES public.favorites(favid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: favtrips fk_fav_trips; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favtrips
    ADD CONSTRAINT fk_fav_trips FOREIGN KEY (favid) REFERENCES public.favorites(favid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: favorites fk_fav_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk_fav_users FOREIGN KEY (userid) REFERENCES public.users(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: plannerentries fk_planentr_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plannerentries
    ADD CONSTRAINT fk_planentr_users FOREIGN KEY (userid) REFERENCES public.users(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TABLE favorites; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.favorites TO gav;


--
-- Name: TABLE favpoints; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.favpoints TO gav;


--
-- Name: TABLE favtrips; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.favtrips TO gav;


--
-- Name: TABLE plannerentries; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plannerentries TO gav;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO gav;


--
-- PostgreSQL database dump complete
--

