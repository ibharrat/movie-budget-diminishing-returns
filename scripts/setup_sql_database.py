"""
Builds a normalized SQLite relational database from the movie dataset
and executes all 8 required SQL queries, generating structured JSON
data with exact query execution metrics, tabular results, and visualization payloads.
"""

import sqlite3
import json
from pathlib import Path

def setup_database():
    db_path = Path("public/data/movies_relational.db")
    db_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Remove existing db if any
    if db_path.exists():
        db_path.unlink()
        
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()
    
    # Enable foreign keys
    cursor.execute("PRAGMA foreign_keys = ON;")
    
    # 1. Create Normalized Tables
    cursor.execute("""
    CREATE TABLE movies (
        movie_id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        release_year INTEGER,
        budget REAL NOT NULL,
        revenue REAL NOT NULL,
        runtime INTEGER,
        budget_tier TEXT NOT NULL,
        multiplier REAL NOT NULL,
        is_profitable INTEGER NOT NULL
    );
    """)
    
    cursor.execute("""
    CREATE TABLE genres (
        genre_id INTEGER PRIMARY KEY,
        genre_name TEXT UNIQUE NOT NULL
    );
    """)
    
    cursor.execute("""
    CREATE TABLE movie_genres (
        movie_id INTEGER,
        genre_id INTEGER,
        PRIMARY KEY (movie_id, genre_id),
        FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
        FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
    );
    """)
    
    cursor.execute("""
    CREATE TABLE studios (
        studio_id INTEGER PRIMARY KEY,
        studio_name TEXT UNIQUE NOT NULL,
        studio_tier TEXT NOT NULL
    );
    """)
    
    cursor.execute("""
    CREATE TABLE movie_studios (
        movie_id INTEGER,
        studio_id INTEGER,
        PRIMARY KEY (movie_id, studio_id),
        FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
        FOREIGN KEY (studio_id) REFERENCES studios(studio_id) ON DELETE CASCADE
    );
    """)
    
    # Seed data
    # Genres
    genre_list = [
        (1, 'Action'),
        (2, 'Adventure'),
        (3, 'Animation'),
        (4, 'Comedy'),
        (5, 'Crime'),
        (6, 'Drama'),
        (7, 'Horror'),
        (8, 'Mystery'),
        (9, 'Romance'),
        (10, 'Sci-Fi'),
        (11, 'Thriller'),
        (12, 'Fantasy')
    ]
    cursor.executemany("INSERT INTO genres VALUES (?, ?);", genre_list)
    
    # Studios
    studio_list = [
        (1, 'Walt Disney Pictures', 'Major Conglomerate'),
        (2, 'Warner Bros. Pictures', 'Major Conglomerate'),
        (3, 'Universal Pictures', 'Major Conglomerate'),
        (4, 'Sony Pictures / Columbia', 'Major Conglomerate'),
        (5, 'Paramount Pictures', 'Major Conglomerate'),
        (6, '20th Century Fox', 'Major Conglomerate'),
        (7, 'A24', 'Independent / Mini-Major'),
        (8, 'Blumhouse Productions', 'Independent / Mini-Major'),
        (9, 'Lionsgate', 'Independent / Mini-Major'),
        (10, 'Miramax Films', 'Independent / Mini-Major')
    ]
    cursor.executemany("INSERT INTO studios VALUES (?, ?, ?);", studio_list)
    
    # Sample movie catalog across tiers, genres, and studios
    # Tier brackets:
    # Micro: < $5M
    # Low: $5M-$25M
    # Mid: $25M-$65M
    # High: $65M-$140M
    # Mega: $140M+
    raw_movies = [
        # Micro
        (1, 'Paranormal Activity', 2007, 15000, 193355800, 86, '< $5M', 12890.39, 1, [7, 11], [8]),
        (2, 'The Blair Witch Project', 1999, 60000, 248639099, 81, '< $5M', 4143.98, 1, [7, 8], [9]),
        (3, 'Eraserhead', 1977, 400000, 30500000, 89, '< $5M', 76.25, 1, [7, 10], [7]),
        (4, 'Primer', 2004, 7000, 425000, 77, '< $5M', 60.71, 1, [10, 6], [7]),
        (5, 'Saw', 2004, 1200000, 103911669, 103, '< $5M', 86.59, 1, [7, 11], [9]),
        (6, 'Insidious', 2010, 1500000, 99557032, 103, '< $5M', 66.37, 1, [7, 8], [8]),
        (7, 'Get Out', 2017, 4500000, 255407969, 104, '< $5M', 56.76, 1, [7, 11, 8], [8, 3]),
        (8, 'The Witch', 2015, 4000000, 40423945, 92, '< $5M', 10.11, 1, [7, 8, 6], [7]),
        (9, 'Moonlight', 2016, 4000000, 65300000, 111, '< $5M', 16.33, 1, [6], [7]),
        (10, 'Split', 2016, 9000000, 278454617, 117, '$5M-$25M', 30.94, 1, [7, 11], [8, 3]),
        
        # Low
        (11, 'Pulp Fiction', 1994, 8000000, 213928762, 154, '$5M-$25M', 26.74, 1, [5, 6, 11], [10]),
        (12, 'Halloween', 1978, 325000, 70000000, 91, '< $5M', 215.38, 1, [7, 11], [9]),
        (13, 'John Wick', 2014, 20000000, 86013056, 101, '$5M-$25M', 4.30, 1, [1, 11], [9]),
        (14, 'Slumdog Millionaire', 2008, 15000000, 377910544, 120, '$5M-$25M', 25.19, 1, [6, 9], [6]),
        (15, 'Whiplash', 2014, 3300000, 49000000, 107, '< $5M', 14.85, 1, [6], [4]),
        (16, 'Lady Bird', 2017, 10000000, 78600000, 94, '$5M-$25M', 7.86, 1, [4, 6], [7]),
        (17, 'Hereditary', 2018, 10000000, 80200000, 127, '$5M-$25M', 8.02, 1, [7, 6], [7]),
        (18, 'Ex Machina', 2014, 15000000, 36869414, 108, '$5M-$25M', 2.46, 0, [10, 6, 11], [3]),
        (19, 'The Purge', 2013, 3000000, 89328627, 85, '< $5M', 29.78, 1, [7, 10, 11], [8, 3]),
        (20, 'Don''t Breathe', 2016, 9900000, 157100845, 88, '$5M-$25M', 15.87, 1, [7, 11], [4]),

        # Mid
        (21, 'Deadpool', 2016, 58000000, 783112979, 108, '$25M-$65M', 13.50, 1, [1, 4, 10], [6]),
        (22, 'Sicario', 2015, 30000000, 84872444, 121, '$25M-$65M', 2.83, 1, [1, 5, 6, 11], [9]),
        (23, 'A Quiet Place', 2018, 17000000, 340939361, 90, '$5M-$25M', 20.06, 1, [7, 10, 6], [5]),
        (24, 'Arrival', 2016, 47000000, 203388186, 116, '$25M-$65M', 4.33, 1, [10, 6, 8], [5]),
        (25, 'The Nice Guys', 2016, 50000000, 62788218, 116, '$25M-$65M', 1.26, 0, [4, 5, 1], [2]),
        (26, 'Baby Driver', 2017, 34000000, 226945087, 113, '$25M-$65M', 6.67, 1, [1, 5], [4]),
        (27, 'Ford v Ferrari', 2019, 97600000, 225508210, 152, '$65M-$140M', 2.31, 0, [1, 6], [6]),
        (28, 'Knives Out', 2019, 40000000, 312897920, 130, '$25M-$65M', 7.82, 1, [4, 5, 8], [9]),
        (29, 'Steve Jobs', 2015, 30000000, 34441873, 122, '$25M-$65M', 1.15, 0, [6], [3]),
        (30, 'Birdman', 2014, 18000000, 103215094, 119, '$5M-$25M', 5.73, 1, [4, 6], [6]),

        # High
        (31, 'The Martian', 2015, 108000000, 630161890, 144, '$65M-$140M', 5.83, 1, [10, 2, 6], [6]),
        (32, 'Dune: Part One', 2021, 165000000, 402027583, 155, '$140M+', 2.44, 0, [10, 2], [2]),
        (33, 'Interstellar', 2014, 165000000, 701729206, 169, '$140M+', 4.25, 1, [10, 6, 2], [5, 2]),
        (34, 'Blade Runner 2049', 2017, 150000000, 259239658, 164, '$140M+', 1.73, 0, [10, 8, 6], [2, 4]),
        (35, 'Inception', 2010, 160000000, 825532764, 148, '$140M+', 5.16, 1, [1, 10, 11], [2]),
        (36, 'Mad Max: Fury Road', 2015, 150000000, 375709081, 120, '$140M+', 2.50, 1, [1, 2, 10], [2]),
        (37, 'Tomorrowland', 2015, 190000000, 209154322, 130, '$140M+', 1.10, 0, [10, 2, 12], [1]),
        (38, 'Gravity', 2013, 100000000, 723192705, 91, '$65M-$140M', 7.23, 1, [10, 11, 6], [2]),
        (39, 'Alita: Battle Angel', 2019, 170000000, 404852543, 122, '$140M+', 2.38, 0, [1, 10, 2], [6]),
        (40, 'Edge of Tomorrow', 2014, 178000000, 370541256, 113, '$140M+', 2.08, 0, [1, 10], [2]),

        # Mega Blockbusters
        (41, 'Avatar', 2009, 237000000, 2787965087, 162, '$140M+', 11.76, 1, [1, 2, 10, 12], [6]),
        (42, 'Avengers: Endgame', 2019, 356000000, 2797800564, 181, '$140M+', 7.86, 1, [1, 2, 10], [1]),
        (43, 'John Carter', 2012, 250000000, 284139100, 132, '$140M+', 1.14, 0, [1, 2, 10], [1]),
        (44, 'Battleship', 2012, 220000000, 303025485, 131, '$140M+', 1.38, 0, [1, 10, 11], [3]),
        (45, 'Green Lantern', 2011, 200000000, 219851172, 114, '$140M+', 1.10, 0, [1, 2, 10], [2]),
        (46, 'Justice League', 2017, 300000000, 657924295, 120, '$140M+', 2.19, 0, [1, 2, 10, 12], [2]),
        (47, 'The 13th Warrior', 1999, 160000000, 61698899, 102, '$140M+', 0.39, 0, [1, 2], [1]),
        (48, 'Spectre', 2015, 245000000, 880674609, 148, '$140M+', 3.59, 1, [1, 2, 11], [4, 6]),
        (49, 'Star Wars: The Force Awakens', 2015, 245000000, 2068223624, 138, '$140M+', 8.44, 1, [1, 2, 10, 12], [1]),
        (50, 'Jupiter Ascending', 2015, 176000000, 183987723, 127, '$140M+', 1.05, 0, [10, 1, 2], [2])
    ]
    
    # Insert movies, genre associations, studio associations
    for m in raw_movies:
        mid, title, year, budget, rev, runtime, tier, mult, is_prof, g_ids, s_ids = m
        cursor.execute("""
            INSERT INTO movies (movie_id, title, release_year, budget, revenue, runtime, budget_tier, multiplier, is_profitable)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        """, (mid, title, year, budget, rev, runtime, tier, mult, is_prof))
        
        for gid in g_ids:
            cursor.execute("INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?);", (mid, gid))
            
        for sid in s_ids:
            cursor.execute("INSERT INTO movie_studios (movie_id, studio_id) VALUES (?, ?);", (mid, sid))
            
    conn.commit()
    print(f"[OK] Relational database populated with {len(raw_movies)} movies, 12 genres, and 10 studios.")
    
    # Execute the 8 queries and collect results
    queries = [
        {
            "id": "q1",
            "category": "Basic selection",
            "number": "01",
            "title": "Baseline Theatrical Financial Selection",
            "clauses": ["SELECT", "FROM", "LIMIT"],
            "question": "How do we inspect the baseline financial profile (budget, gross, and multiplier) of films in the database?",
            "explanation": "Demonstrates primary SELECT extraction with a derived box office multiplier column, extracting foundational financial attributes from the movies table.",
            "sql": """SELECT 
    movie_id,
    title,
    release_year,
    budget,
    revenue,
    ROUND(revenue / budget, 2) AS multiplier
FROM movies
LIMIT 8;""",
        },
        {
            "id": "q2",
            "category": "Filtering",
            "number": "02",
            "title": "Filtering Capital-Efficient Low-Budget Releases",
            "clauses": ["SELECT", "FROM", "WHERE"],
            "question": "Which low-budget releases produced under $15M achieved commercial viability?",
            "explanation": "Demonstrates simple WHERE filtering to isolate lean productions produced under the $15M threshold.",
            "sql": """SELECT 
    title,
    release_year,
    budget,
    revenue,
    ROUND(revenue / budget, 2) AS box_office_multiplier
FROM movies
WHERE budget <= 15000000
ORDER BY box_office_multiplier DESC
LIMIT 8;""",
        },
        {
            "id": "q3",
            "category": "Multiple conditions",
            "number": "03",
            "title": "Multi-Condition Screening for Mid-Budget Breakeven Hits",
            "clauses": ["SELECT", "FROM", "WHERE (BETWEEN, AND, >=)"],
            "question": "Which modern releases (2000+) in the mid-budget range ($25M–$100M) cleared the theatrical 2.5x breakeven rule?",
            "explanation": "Demonstrates compound boolean logic using BETWEEN, AND, and comparison operators to filter modern mid-budget hits.",
            "sql": """SELECT 
    title,
    release_year,
    budget,
    revenue,
    ROUND(revenue / budget, 2) AS multiplier,
    'Profitable' AS theatrical_status
FROM movies
WHERE budget BETWEEN 25000000 AND 100000000
  AND revenue >= (2.5 * budget)
  AND release_year >= 2000
ORDER BY multiplier DESC;""",
        },
        {
            "id": "q4",
            "category": "Sorting",
            "number": "04",
            "title": "Ranking Mega-Budget Diminishing Return Traps",
            "clauses": ["SELECT", "FROM", "WHERE", "ORDER BY DESC"],
            "question": "What are the largest production budget films that failed to meet the 2.5x theatrical breakeven threshold?",
            "explanation": "Demonstrates sorting with ORDER BY ... DESC to surface the most severe high-budget financial catastrophes where massive capital yielded diminishing returns.",
            "sql": """SELECT 
    title,
    release_year,
    budget,
    revenue,
    ROUND(revenue - budget, 2) AS net_cash_diff,
    ROUND(revenue / budget, 2) AS multiplier
FROM movies
WHERE budget >= 150000000 
  AND revenue < (2.5 * budget)
ORDER BY budget DESC
LIMIT 8;""",
        },
        {
            "id": "q5",
            "category": "Aggregation",
            "number": "05",
            "title": "Macro Aggregations & Dataset-Wide Financial Summary",
            "clauses": ["SELECT", "FROM", "COUNT", "SUM", "AVG", "MAX"],
            "question": "What are the aggregate industry totals for production capital, worldwide gross, average budget, and peak multiples?",
            "explanation": "Applies standard SQL aggregate functions (COUNT, SUM, AVG, MAX) across the entire theatrical sample to summarize macro economics.",
            "sql": """SELECT 
    COUNT(*) AS total_films_evaluated,
    ROUND(SUM(budget) / 1000000.0, 1) AS total_budget_millions,
    ROUND(SUM(revenue) / 1000000.0, 1) AS total_revenue_millions,
    ROUND(AVG(budget) / 1000000.0, 1) AS avg_budget_millions,
    ROUND(AVG(revenue) / 1000000.0, 1) AS avg_revenue_millions,
    ROUND(AVG(revenue / budget), 2) AS avg_multiplier,
    ROUND(MAX(revenue / budget), 1) AS max_viral_multiplier
FROM movies
WHERE budget > 0;""",
        },
        {
            "id": "q6",
            "category": "Group comparison",
            "number": "06",
            "title": "Group Comparison: Diminishing Returns by Budget Tier",
            "clauses": ["SELECT", "FROM", "GROUP BY", "ORDER BY"],
            "question": "How does average multiplier and breakeven profitability percentage decay across discretized budget tiers?",
            "explanation": "Performs categorical GROUP BY aggregation across budget tiers to pinpoint the exact diminishing returns curve. Serves as SQL-to-Visualization #1.",
            "sql": """SELECT 
    budget_tier,
    COUNT(*) AS movie_count,
    ROUND(AVG(budget) / 1000000.0, 1) AS avg_budget_mil,
    ROUND(AVG(revenue) / 1000000.0, 1) AS avg_revenue_mil,
    ROUND(AVG(revenue / budget), 2) AS avg_multiplier,
    ROUND(100.0 * SUM(CASE WHEN revenue >= 2.5 * budget THEN 1 ELSE 0 END) / COUNT(*), 1) AS pct_profitable
FROM movies
GROUP BY budget_tier
ORDER BY MIN(budget) ASC;""",
            "isVisualizationTarget": True,
            "vizType": "bar-trend",
            "vizLabel": "SQL → Visualization #1: Capital Efficiency vs. Budget Tier"
        },
        {
            "id": "q7",
            "category": "HAVING",
            "number": "07",
            "title": "Genre Efficiency Threshold Filter with HAVING Clause",
            "clauses": ["SELECT", "FROM", "JOIN", "GROUP BY", "HAVING", "ORDER BY"],
            "question": "Which genre categories maintain both a substantial release volume AND an average box office multiple clearing theatrical breakeven (>= 2.5x)?",
            "explanation": "Demonstrates post-aggregation filtering using the HAVING clause after grouping by genre and joining through the relational junction table. Serves as SQL-to-Visualization #2.",
            "sql": """SELECT 
    g.genre_name,
    COUNT(m.movie_id) AS total_releases,
    ROUND(AVG(m.budget) / 1000000.0, 1) AS avg_budget_mil,
    ROUND(AVG(m.revenue) / 1000000.0, 1) AS avg_revenue_mil,
    ROUND(AVG(m.revenue / m.budget), 2) AS avg_multiplier,
    ROUND(100.0 * SUM(CASE WHEN m.revenue >= 2.5 * m.budget THEN 1 ELSE 0 END) / COUNT(*), 1) AS breakeven_rate_pct
FROM movies m
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g ON mg.genre_id = g.genre_id
GROUP BY g.genre_name
HAVING COUNT(m.movie_id) >= 4 
   AND AVG(m.revenue / m.budget) >= 2.5
ORDER BY avg_multiplier DESC;""",
            "isVisualizationTarget": True,
            "vizType": "genre-bar",
            "vizLabel": "SQL → Visualization #2: High-Yield Genre Breakeven Benchmark"
        },
        {
            "id": "q8",
            "category": "JOIN",
            "number": "08",
            "title": "Multi-Table Relational JOIN: Conglomerate vs. Indie Studio Portfolios",
            "clauses": ["SELECT", "FROM", "INNER JOIN (x2)", "GROUP BY", "ORDER BY"],
            "question": "How do major studio conglomerates compare against boutique independent distributors in aggregate capital deployed and commercial success rates?",
            "explanation": "Demonstrates relational database capability by joining 3 normalized tables (studios -> movie_studios -> movies) to aggregate portfolio metrics across corporate studio tiers. Serves as SQL-to-Visualization #3.",
            "sql": """SELECT 
    s.studio_tier,
    s.studio_name,
    COUNT(m.movie_id) AS portfolio_size,
    ROUND(SUM(m.budget) / 1000000.0, 1) AS total_invested_mil,
    ROUND(SUM(m.revenue) / 1000000.0, 1) AS total_gross_mil,
    ROUND(AVG(m.revenue / m.budget), 2) AS avg_multiplier,
    ROUND(100.0 * SUM(CASE WHEN m.revenue >= 2.5 * m.budget THEN 1 ELSE 0 END) / COUNT(*), 1) AS profitable_success_rate
FROM studios s
JOIN movie_studios ms ON s.studio_id = ms.studio_id
JOIN movies m ON ms.movie_id = m.movie_id
GROUP BY s.studio_tier, s.studio_name
ORDER BY total_gross_mil DESC;""",
            "isVisualizationTarget": True,
            "vizType": "studio-matrix",
            "vizLabel": "SQL → Visualization #3: Studio Scale & Capital Return Matrix"
        }
    ]
    
    # Run each query and store records
    query_outputs = []
    for q in queries:
        cursor.execute(q["sql"])
        cols = [description[0] for description in cursor.description]
        rows = cursor.fetchall()
        
        # Convert row tuples to dictionaries
        dict_rows = [dict(zip(cols, row)) for row in rows]
        
        q_copy = dict(q)
        q_copy["columns"] = cols
        q_copy["rows"] = dict_rows
        q_copy["rowCount"] = len(dict_rows)
        query_outputs.append(q_copy)
        print(f"[*] Query {q['number']} executed successfully: {len(dict_rows)} rows returned.")
        
    output_json_path = Path("src/data/sqlQueriesData.json")
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(query_outputs, f, indent=2)
        
    print(f"[OK] Saved all 8 query outputs to {output_json_path}")
    conn.close()

if __name__ == '__main__':
    setup_database()
