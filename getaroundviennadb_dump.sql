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
	CONSTRAINT d_ref_type_check CHECK (((VALUE)::text = ANY ((ARRAY['stopID'::character varying, 'coord'::character varying])::text[])));


ALTER DOMAIN public.d_ref_type OWNER TO postgres;

--
-- Name: d_route_type; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.d_route_type AS character varying(16)
	CONSTRAINT d_route_type_check CHECK (((VALUE)::text = ANY ((ARRAY['LEASTTIME'::character varying, 'LEASTINTERCHANGE'::character varying, 'LEASTWALKING'::character varying])::text[])));


ALTER DOMAIN public.d_route_type OWNER TO postgres;

--
-- Name: d_speed; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.d_speed AS character varying(6)
	CONSTRAINT d_speed_check CHECK (((VALUE)::text = ANY ((ARRAY['Slow'::character varying, 'Normal'::character varying, 'Fast'::character varying])::text[])));


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
    exclmeans integer,
    changespeed public.d_speed,
    routetype public.d_route_type,
    maxchanges integer,
    favid integer NOT NULL
);


ALTER TABLE public.favtrips OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    groupid integer NOT NULL,
    name text NOT NULL,
    color text NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: groups_groupid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groups_groupid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_groupid_seq OWNER TO postgres;

--
-- Name: groups_groupid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groups_groupid_seq OWNED BY public.groups.groupid;


--
-- Name: planentr_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planentr_groups (
    groupid integer NOT NULL,
    planid integer NOT NULL
);


ALTER TABLE public.planentr_groups OWNER TO postgres;

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
    exclmeans integer,
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
-- Name: groups groupid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups ALTER COLUMN groupid SET DEFAULT nextval('public.groups_groupid_seq'::regclass);


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



--
-- Data for Name: favpoints; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: favtrips; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: planentr_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: plannerentries; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'max.muster@email.com', 'max123', 'blue', false, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (2, 'beatrix.beate@email.com', 'beatrix123', 'blue', false, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (3, 'holly.hoess@email.com', 'holly123', 'blue', false, NULL, NULL, NULL, NULL);
INSERT INTO public.users VALUES (4, 'dora.dunny@email.com', 'dora123', 'blue', false, NULL, NULL, NULL, NULL);


--
-- Name: favorites_favid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_favid_seq', 1, false);


--
-- Name: groups_groupid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groups_groupid_seq', 1, false);


--
-- Name: plannerentries_planid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plannerentries_planid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 4, true);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favid);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (groupid);


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
-- Name: planentr_groups unique_peg; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planentr_groups
    ADD CONSTRAINT unique_peg UNIQUE (groupid, planid);


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
-- Name: planentr_groups fk_peg_groups; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planentr_groups
    ADD CONSTRAINT fk_peg_groups FOREIGN KEY (groupid) REFERENCES public.groups(groupid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: planentr_groups fk_peg_planentr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planentr_groups
    ADD CONSTRAINT fk_peg_planentr FOREIGN KEY (planid) REFERENCES public.plannerentries(planid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: plannerentries fk_planentr_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plannerentries
    ADD CONSTRAINT fk_planentr_users FOREIGN KEY (userid) REFERENCES public.users(userid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

