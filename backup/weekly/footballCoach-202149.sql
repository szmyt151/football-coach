--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.0 (Debian 14.0-1.pgdg110+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: student
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO student;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: student
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: payment_paymenttype_enum; Type: TYPE; Schema: public; Owner: student
--

CREATE TYPE public.payment_paymenttype_enum AS ENUM (
    'Member payment'
);


ALTER TYPE public.payment_paymenttype_enum OWNER TO student;

--
-- Name: player_playerposition_enum; Type: TYPE; Schema: public; Owner: student
--

CREATE TYPE public.player_playerposition_enum AS ENUM (
    'GK - Goalkeeper',
    'CB - Center Back',
    'RB - Right Back',
    'LB - Left Back',
    'LM - Left Midfielder',
    'RM - Right Midfielder',
    'CDM - Center Defender Midfielder',
    'CM - Center Midfielder',
    'CAM - Center Attacker Midfielder',
    'RW - Right Winger',
    'LW - Left Winger',
    'LF - Left Forward',
    'RF - Right Forward',
    'CF - Center Forward',
    'ST - Striker'
);


ALTER TYPE public.player_playerposition_enum OWNER TO student;

--
-- Name: player_preferredfoot_enum; Type: TYPE; Schema: public; Owner: student
--

CREATE TYPE public.player_preferredfoot_enum AS ENUM (
    'Left',
    'Right',
    'Both'
);


ALTER TYPE public.player_preferredfoot_enum OWNER TO student;

--
-- Name: training_trainingtype_enum; Type: TYPE; Schema: public; Owner: student
--

CREATE TYPE public.training_trainingtype_enum AS ENUM (
    'Cardio',
    'Tactics',
    'Before match',
    'Gym'
);


ALTER TYPE public.training_trainingtype_enum OWNER TO student;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: payment; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    value character varying NOT NULL,
    description character varying NOT NULL,
    "paymentType" public.payment_paymenttype_enum NOT NULL,
    "userId" integer
);


ALTER TABLE public.payment OWNER TO student;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_id_seq OWNER TO student;

--
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: player; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.player (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    birth timestamp without time zone NOT NULL,
    "preferredFoot" public.player_preferredfoot_enum NOT NULL,
    "playerPosition" public.player_playerposition_enum NOT NULL,
    "teamId" integer NOT NULL,
    nationality character varying,
    firstsquad boolean,
    "shirtNumber" integer DEFAULT 18 NOT NULL
);


ALTER TABLE public.player OWNER TO student;

--
-- Name: player_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.player_id_seq OWNER TO student;

--
-- Name: player_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.player_id_seq OWNED BY public.player.id;


--
-- Name: player_statistic; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.player_statistic (
    id integer NOT NULL,
    goals integer NOT NULL,
    assists integer NOT NULL,
    "cleanSheets" integer NOT NULL,
    "yellowCards" integer NOT NULL,
    "redCards" integer NOT NULL,
    "teamMatchId" integer,
    "playerId" integer,
    "seasonId" integer
);


ALTER TABLE public.player_statistic OWNER TO student;

--
-- Name: player_statistic_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.player_statistic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.player_statistic_id_seq OWNER TO student;

--
-- Name: player_statistic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.player_statistic_id_seq OWNED BY public.player_statistic.id;


--
-- Name: player_trainings_training; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.player_trainings_training (
    "playerId" integer NOT NULL,
    "trainingId" integer NOT NULL
);


ALTER TABLE public.player_trainings_training OWNER TO student;

--
-- Name: season; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.season (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public.season OWNER TO student;

--
-- Name: season_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.season_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.season_id_seq OWNER TO student;

--
-- Name: season_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.season_id_seq OWNED BY public.season.id;


--
-- Name: season_teams_team; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.season_teams_team (
    "seasonId" integer NOT NULL,
    "teamId" integer NOT NULL
);


ALTER TABLE public.season_teams_team OWNER TO student;

--
-- Name: team; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.team (
    id integer NOT NULL,
    name character varying NOT NULL,
    "myTeam" boolean NOT NULL,
    "userIdId" integer
);


ALTER TABLE public.team OWNER TO student;

--
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_id_seq OWNER TO student;

--
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- Name: team_match; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.team_match (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    "scoreHome" integer NOT NULL,
    "scoreAway" integer NOT NULL,
    "seasonId" integer,
    "homeTeamId" integer,
    "awayTeamId" integer
);


ALTER TABLE public.team_match OWNER TO student;

--
-- Name: team_match_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.team_match_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_match_id_seq OWNER TO student;

--
-- Name: team_match_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.team_match_id_seq OWNED BY public.team_match.id;


--
-- Name: team_seasons_season; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.team_seasons_season (
    "teamId" integer NOT NULL,
    "seasonId" integer NOT NULL
);


ALTER TABLE public.team_seasons_season OWNER TO student;

--
-- Name: training; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.training (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    duration integer NOT NULL,
    "trainingType" public.training_trainingtype_enum NOT NULL,
    "teamId" integer
);


ALTER TABLE public.training OWNER TO student;

--
-- Name: training_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.training_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.training_id_seq OWNER TO student;

--
-- Name: training_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.training_id_seq OWNED BY public.training.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    "isActive" boolean NOT NULL,
    "teamId" integer
);


ALTER TABLE public."user" OWNER TO student;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO student;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: player id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player ALTER COLUMN id SET DEFAULT nextval('public.player_id_seq'::regclass);


--
-- Name: player_statistic id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_statistic ALTER COLUMN id SET DEFAULT nextval('public.player_statistic_id_seq'::regclass);


--
-- Name: season id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.season ALTER COLUMN id SET DEFAULT nextval('public.season_id_seq'::regclass);


--
-- Name: team id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- Name: team_match id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match ALTER COLUMN id SET DEFAULT nextval('public.team_match_id_seq'::regclass);


--
-- Name: training id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.training ALTER COLUMN id SET DEFAULT nextval('public.training_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.payment (id, value, description, "paymentType", "userId") FROM stdin;
\.


--
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.player (id, "firstName", "lastName", birth, "preferredFoot", "playerPosition", "teamId", nationality, firstsquad, "shirtNumber") FROM stdin;
1	Manuel	Neuer	1996-11-30 00:09:27.645	Right	GK - Goalkeeper	1	Poland	t	1
2	Benji	Pavard	1992-11-30 00:09:27.645	Right	RB - Right Back	1	France	t	5
4	Dayot	Upamecano	1999-11-30 00:09:27.645	Right	CB - Center Back	1	France	t	2
5	Lucas	Hernandez	1996-11-30 00:09:27.645	Left	LB - Left Back	1	France	t	21
6	Alphonso	Davies	1999-11-30 00:09:27.645	Left	LB - Left Back	1	Canada	t	19
7	Josua	Kimmich	1996-11-30 00:09:27.645	Right	CDM - Center Defender Midfielder	1	Germany	t	6
8	Leon	Goretzka	1995-11-30 00:09:27.645	Right	CM - Center Midfielder	1	Germany	t	8
9	Thomas	Muller	1988-11-30 00:09:27.645	Right	CAM - Center Attacker Midfielder	1	Germany	t	25
10	Leroy	Sane	1996-11-30 00:09:27.645	Left	LW - Left Winger	1	Germany	t	10
11	Serge	Gnabry	1997-11-30 00:09:27.645	Right	RW - Right Winger	1	Germany	t	7
12	Robert	Lewandowski	1988-11-30 00:09:27.645	Right	ST - Striker	1	Poland	t	9
3	Niclas	Suele	1993-11-30 00:09:27.645	Right	CB - Center Back	1	Germany	f	4
\.


--
-- Data for Name: player_statistic; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.player_statistic (id, goals, assists, "cleanSheets", "yellowCards", "redCards", "teamMatchId", "playerId", "seasonId") FROM stdin;
1	1	0	0	0	0	1	12	1
\.


--
-- Data for Name: player_trainings_training; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.player_trainings_training ("playerId", "trainingId") FROM stdin;
\.


--
-- Data for Name: season; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.season (id, name) FROM stdin;
1	2021/2022
\.


--
-- Data for Name: season_teams_team; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.season_teams_team ("seasonId", "teamId") FROM stdin;
1	1
1	2
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.team (id, name, "myTeam", "userIdId") FROM stdin;
1	Bayern Monachium	t	1
2	Real Madryt	f	\N
\.


--
-- Data for Name: team_match; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.team_match (id, date, "scoreHome", "scoreAway", "seasonId", "homeTeamId", "awayTeamId") FROM stdin;
1	2021-12-05 14:34:58.724	1	0	1	1	2
\.


--
-- Data for Name: team_seasons_season; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.team_seasons_season ("teamId", "seasonId") FROM stdin;
\.


--
-- Data for Name: training; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public.training (id, date, duration, "trainingType", "teamId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: student
--

COPY public."user" (id, "firstName", "lastName", username, password, "isActive", "teamId") FROM stdin;
1	Adrian	Miesikowski	szmyt151	1234567890	t	\N
\.


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- Name: player_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.player_id_seq', 1, false);


--
-- Name: player_statistic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.player_statistic_id_seq', 1, false);


--
-- Name: season_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.season_id_seq', 1, false);


--
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.team_id_seq', 1, false);


--
-- Name: team_match_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.team_match_id_seq', 1, false);


--
-- Name: training_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.training_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: student
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: team_match PK_243c3678b97a431627b84d6d981; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match
    ADD CONSTRAINT "PK_243c3678b97a431627b84d6d981" PRIMARY KEY (id);


--
-- Name: player_trainings_training PK_380e67a43f4f5bb2f244710463e; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_trainings_training
    ADD CONSTRAINT "PK_380e67a43f4f5bb2f244710463e" PRIMARY KEY ("playerId", "trainingId");


--
-- Name: player_statistic PK_5d3d814e5408e61648d8c1fb925; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_statistic
    ADD CONSTRAINT "PK_5d3d814e5408e61648d8c1fb925" PRIMARY KEY (id);


--
-- Name: season_teams_team PK_5d825b2517240a448d655524b3e; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.season_teams_team
    ADD CONSTRAINT "PK_5d825b2517240a448d655524b3e" PRIMARY KEY ("seasonId", "teamId");


--
-- Name: player PK_65edadc946a7faf4b638d5e8885; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY (id);


--
-- Name: season PK_8ac0d081dbdb7ab02d166bcda9f; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.season
    ADD CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY (id);


--
-- Name: training PK_c436c96be3adf1aa439ef471427; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.training
    ADD CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: team_seasons_season PK_d35869208467b000937ba926a74; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_seasons_season
    ADD CONSTRAINT "PK_d35869208467b000937ba926a74" PRIMARY KEY ("teamId", "seasonId");


--
-- Name: team PK_f57d8293406df4af348402e4b74; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY (id);


--
-- Name: payment PK_fcaec7df5adf9cac408c686b2ab; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY (id);


--
-- Name: payment REL_b046318e0b341a7f72110b7585; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "REL_b046318e0b341a7f72110b7585" UNIQUE ("userId");


--
-- Name: training REL_da6f54eec6ba3e796ce69e2a47; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.training
    ADD CONSTRAINT "REL_da6f54eec6ba3e796ce69e2a47" UNIQUE ("teamId");


--
-- Name: team_match UQ_0576f8cccca9586793e775d4446; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match
    ADD CONSTRAINT "UQ_0576f8cccca9586793e775d4446" UNIQUE ("homeTeamId");


--
-- Name: user UQ_1e89f1fd137dc7fea7242377e25; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_1e89f1fd137dc7fea7242377e25" UNIQUE ("teamId");


--
-- Name: team_match UQ_91d8814ac484e4d6209b324055e; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match
    ADD CONSTRAINT "UQ_91d8814ac484e4d6209b324055e" UNIQUE ("awayTeamId");


--
-- Name: IDX_0b113fc38e19be7267f52b3ea5; Type: INDEX; Schema: public; Owner: student
--

CREATE INDEX "IDX_0b113fc38e19be7267f52b3ea5" ON public.player_trainings_training USING btree ("playerId");


--
-- Name: IDX_1d12c30bc12c8aab88f73d003b; Type: INDEX; Schema: public; Owner: student
--

CREATE INDEX "IDX_1d12c30bc12c8aab88f73d003b" ON public.team_seasons_season USING btree ("seasonId");


--
-- Name: IDX_4333ab741eb1a4fb5e1a2c2a1a; Type: INDEX; Schema: public; Owner: student
--

CREATE INDEX "IDX_4333ab741eb1a4fb5e1a2c2a1a" ON public.season_teams_team USING btree ("teamId");


--
-- Name: IDX_43704cbcadcaec0e180a6b0e22; Type: INDEX; Schema: public; Owner: student
--

CREATE INDEX "IDX_43704cbcadcaec0e180a6b0e22" ON public.team_seasons_season USING btree ("teamId");


--
-- Name: IDX_9cacb8573dd3420d358ac90fa9; Type: INDEX; Schema: public; Owner: student
--

CREATE INDEX "IDX_9cacb8573dd3420d358ac90fa9" ON public.season_teams_team USING btree ("seasonId");


--
-- Name: IDX_b998e357a0ed56fb5f42525498; Type: INDEX; Schema: public; Owner: student
--

CREATE INDEX "IDX_b998e357a0ed56fb5f42525498" ON public.player_trainings_training USING btree ("trainingId");


--
-- Name: team_match FK_0576f8cccca9586793e775d4446; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match
    ADD CONSTRAINT "FK_0576f8cccca9586793e775d4446" FOREIGN KEY ("homeTeamId") REFERENCES public.team(id);


--
-- Name: player_trainings_training FK_0b113fc38e19be7267f52b3ea5f; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_trainings_training
    ADD CONSTRAINT "FK_0b113fc38e19be7267f52b3ea5f" FOREIGN KEY ("playerId") REFERENCES public.player(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_seasons_season FK_1d12c30bc12c8aab88f73d003be; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_seasons_season
    ADD CONSTRAINT "FK_1d12c30bc12c8aab88f73d003be" FOREIGN KEY ("seasonId") REFERENCES public.season(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user FK_1e89f1fd137dc7fea7242377e25; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_1e89f1fd137dc7fea7242377e25" FOREIGN KEY ("teamId") REFERENCES public.team(id);


--
-- Name: player_statistic FK_22257cae5bf61597bd7866b6510; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_statistic
    ADD CONSTRAINT "FK_22257cae5bf61597bd7866b6510" FOREIGN KEY ("playerId") REFERENCES public.player(id);


--
-- Name: season_teams_team FK_4333ab741eb1a4fb5e1a2c2a1a0; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.season_teams_team
    ADD CONSTRAINT "FK_4333ab741eb1a4fb5e1a2c2a1a0" FOREIGN KEY ("teamId") REFERENCES public.team(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_seasons_season FK_43704cbcadcaec0e180a6b0e223; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_seasons_season
    ADD CONSTRAINT "FK_43704cbcadcaec0e180a6b0e223" FOREIGN KEY ("teamId") REFERENCES public.team(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_match FK_4867e5a110e21ca61e9599eeeeb; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match
    ADD CONSTRAINT "FK_4867e5a110e21ca61e9599eeeeb" FOREIGN KEY ("seasonId") REFERENCES public.season(id);


--
-- Name: player_statistic FK_4ac7e7fd87bfac5b9e7344c3e03; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_statistic
    ADD CONSTRAINT "FK_4ac7e7fd87bfac5b9e7344c3e03" FOREIGN KEY ("teamMatchId") REFERENCES public.team_match(id);


--
-- Name: team_match FK_91d8814ac484e4d6209b324055e; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team_match
    ADD CONSTRAINT "FK_91d8814ac484e4d6209b324055e" FOREIGN KEY ("awayTeamId") REFERENCES public.team(id);


--
-- Name: player_statistic FK_92455074c894d549a76ce41bd16; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_statistic
    ADD CONSTRAINT "FK_92455074c894d549a76ce41bd16" FOREIGN KEY ("seasonId") REFERENCES public.season(id);


--
-- Name: season_teams_team FK_9cacb8573dd3420d358ac90fa98; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.season_teams_team
    ADD CONSTRAINT "FK_9cacb8573dd3420d358ac90fa98" FOREIGN KEY ("seasonId") REFERENCES public.season(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment FK_b046318e0b341a7f72110b75857; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: player_trainings_training FK_b998e357a0ed56fb5f42525498a; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player_trainings_training
    ADD CONSTRAINT "FK_b998e357a0ed56fb5f42525498a" FOREIGN KEY ("trainingId") REFERENCES public.training(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: training FK_da6f54eec6ba3e796ce69e2a472; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.training
    ADD CONSTRAINT "FK_da6f54eec6ba3e796ce69e2a472" FOREIGN KEY ("teamId") REFERENCES public.team(id);


--
-- Name: player FK_e85150e7e8a80bee7f2be3adab0; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT "FK_e85150e7e8a80bee7f2be3adab0" FOREIGN KEY ("teamId") REFERENCES public.team(id);


--
-- Name: team FK_f1dfb4c085d32bccff3921722fd; Type: FK CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT "FK_f1dfb4c085d32bccff3921722fd" FOREIGN KEY ("userIdId") REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

