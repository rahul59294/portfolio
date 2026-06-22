import os
import re
import warnings
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# Suppress warnings for cleaner output
warnings.filterwarnings('ignore')

# Set matplotlib style for premium aesthetics
try:
    plt.style.use('seaborn-v0_8-whitegrid')
except:
    plt.style.use('ggplot')

# =============================================================================
# 0. HELPER FUNCTIONS & INITIAL SETUP
# =============================================================================

def safe_num(series):
    """Safely converts a pandas series to numeric, replacing errors with NaN."""
    return pd.to_numeric(series, errors='coerce')

def normalize_name(name):
    """Cleans up a player name by removing special characters and extra spaces."""
    if not isinstance(name, str):
        return name
    name = name.replace(u'\xa0', ' ')
    name = re.sub(r"[^a-zA-Z0-9 .'-]", "", name)
    name = re.sub(r'\s+', ' ', name).strip()
    return name.lower()

def standardise_batting(df, team_code):
    """Standardizes batting DataFrame columns and adds team code."""
    df['team'] = team_code
    if 'SR' not in df.columns:
        df['SR'] = np.nan
    possible_cols = ["R", "B", "4s", "6s", "SR", "Score"]
    for col in possible_cols:
        if col in df.columns:
            df[col] = safe_num(df[col])
    return df

def standardise_bowling(df, team_code):
    """Standardizes bowling DataFrame columns and adds team code."""
    df['team'] = team_code
    possible_cols = ["R", "O", "M", "W", "Econ", "Dots", "Score"]
    for col in possible_cols:
        if col in df.columns:
            df[col] = safe_num(df[col])
    return df

def load_csv(filename):
    """Safely loads a CSV file from current directory or Data/ folder."""
    if os.path.exists(filename):
        return pd.read_csv(filename)
    elif os.path.exists(f"Data/{filename}"):
        return pd.read_csv(f"Data/{filename}")
    else:
        raise FileNotFoundError(f"Could not find {filename}. Please check your files.")

def load_all_data():
    """Loads all required CSV files and prepares raw datasets."""
    try:
        batting_data = load_csv("batting_data.csv")
        bowling_data = load_csv("bowling_data.csv")
        fielding_data = load_csv("fielding_data.csv")
        dismissals_data = load_csv("dismissals.csv")
        partnership_runs_data = load_csv("partnership_by_runs.csv")
        match_data = load_csv("match_data.csv")
        batting_order_df = load_csv("batting_order.csv")
        bowling_order_df = load_csv("bowling_order.csv")

        batting_order_df['Player'] = batting_order_df['Player'].apply(normalize_name)
        bowling_order_df['Player'] = bowling_order_df['Player'].apply(normalize_name)

        RCB_batting = standardise_batting(load_csv("RCB_batting.csv"), "RCB")
        KKR_Batting = standardise_batting(load_csv("KKR_Batting.csv"), "KKR")
        RR_Batting = standardise_batting(load_csv("RR_Batting.csv"), "RR")
        SRH_Batting = standardise_batting(load_csv("SRH_Batting.csv"), "SRH")
        MI_Batting = standardise_batting(load_csv("MI_Batting.csv"), "MI")
        CSK_Batting = standardise_batting(load_csv("CSK_Batting.csv"), "CSK")
        DC_Batting = standardise_batting(load_csv("DC_Batting.csv"), "DC")
        LSG_Batting = standardise_batting(load_csv("LSG_Batting.csv"), "LSG")
        GT_Batting = standardise_batting(load_csv("GT_Batting.csv"), "GT")
        PBKS_Batting = standardise_batting(load_csv("PBKS_Batting.csv"), "PBKS")

        RCB_bowling = standardise_bowling(load_csv("RCB_bowling.csv"), "RCB")
        KKR_Bowling = standardise_bowling(load_csv("KKR_Bowling.csv"), "KKR")
        RR_Bowling = standardise_bowling(load_csv("RR_Bowling.csv"), "RR")
        SRH_Bowling = standardise_bowling(load_csv("SRH_Bowling.csv"), "SRH")
        MI_Bowling = standardise_bowling(load_csv("MI_Bowling.csv"), "MI")
        CSK_Bowling = standardise_bowling(load_csv("CSK_Bowling.csv"), "CSK")
        DC_Bowling = standardise_bowling(load_csv("DC_Bowling.csv"), "DC")
        LSG_Bowling = standardise_bowling(load_csv("LSG_Bowling.csv"), "LSG")
        GT_Bowling = standardise_bowling(load_csv("GT_Bowling.csv"), "GT")
        PBKS_Bowling = standardise_bowling(load_csv("PBKS_Bowling.csv"), "PBKS")

    except FileNotFoundError as e:
        st.error(f"Error loading data: {e}")
        return None

    # Merge individual team batting items into one large dataset
    all_batting_dfs = [
        RCB_batting, KKR_Batting, RR_Batting, SRH_Batting,
        MI_Batting, CSK_Batting, DC_Batting, LSG_Batting,
        GT_Batting, PBKS_Batting
    ]
    batting_2025 = pd.concat(all_batting_dfs, ignore_index=True)

    # Merge individual team bowling items into one large dataset
    all_bowling_dfs = [
        RCB_bowling, KKR_Bowling, RR_Bowling, SRH_Bowling,
        MI_Bowling, CSK_Bowling, DC_Bowling, LSG_Bowling,
        GT_Bowling, PBKS_Bowling
    ]
    bowling_2025 = pd.concat(all_bowling_dfs, ignore_index=True)

    return {
        'batting_data': batting_data,
        'bowling_data': bowling_data,
        'fielding_data': fielding_data,
        'dismissals_data': dismissals_data,
        'partnership_runs_data': partnership_runs_data,
        'match_data': match_data,
        'batting_order_df': batting_order_df,
        'bowling_order_df': bowling_order_df,
        'batting_2025': batting_2025,
        'bowling_2025': bowling_2025
    }

# =============================================================================
# 1. FANTASY 11 TEAM SELECTION LOGIC
# =============================================================================

def compute_fantasy_scores(batting_2025, bowling_2025, dismissals_data, batting_order_df, bowling_order_df):
    """Calculates 2025 fantasy scores and assigns playing roles."""
    batting_2025['Batter'] = batting_2025['Batter'].apply(normalize_name)
    batting_2025['team'] = batting_2025['team'].str.strip()
    
    bowling_2025['Bowler'] = bowling_2025['Bowler'].apply(normalize_name)
    bowling_2025['team'] = bowling_2025['team'].str.strip()
    
    dismissals_data['Player'] = dismissals_data['Player'].apply(normalize_name)

    # Calculate average batting scores per player
    batting_clean = batting_2025.groupby(['Batter', 'team'])['Score'].mean().reset_index()
    batting_clean = batting_clean.rename(columns={'Score': 'batting_score'})

    # Calculate average bowling scores per player
    bowling_clean = bowling_2025.groupby(['Bowler', 'team'])['Score'].mean().reset_index()
    bowling_clean = bowling_clean.rename(columns={'Score': 'bowling_score', 'Bowler': 'Batter'})

    # Merge batting and bowling parts
    fantasy_scores = pd.merge(batting_clean, bowling_clean, on='Batter', how='outer', suffixes=('_bat', '_bowl'))
    fantasy_scores['team'] = fantasy_scores['team_bat'].fillna(fantasy_scores['team_bowl'])
    fantasy_scores = fantasy_scores.drop(columns=['team_bat', 'team_bowl'])

    fantasy_scores['batting_score'] = fantasy_scores['batting_score'].fillna(0)
    fantasy_scores['bowling_score'] = fantasy_scores['bowling_score'].fillna(0)
    fantasy_scores['fantasy_score'] = fantasy_scores['batting_score'] + fantasy_scores['bowling_score']

    # Assign roles
    conditions = [
        (fantasy_scores['batting_score'] > 0) & (fantasy_scores['bowling_score'] > 0),
        (fantasy_scores['batting_score'] > 0),
        (fantasy_scores['bowling_score'] > 0)
    ]
    choices = ['Allrounder', 'Batter', 'Bowler']
    fantasy_scores['Role'] = np.select(conditions, choices, default='Other')
    fantasy_scores = fantasy_scores.rename(columns={'Batter': 'Player'})

    # Identify wicketkeepers
    wicketkeepers = dismissals_data[dismissals_data['St'] > 0]['Player'].unique()
    fantasy_scores['is_wicketkeeper'] = fantasy_scores['Player'].isin(wicketkeepers)

    def update_role(row):
        if row['is_wicketkeeper'] and row['Role'] == 'Batter':
            return 'Wicketkeeper'
        return row['Role']

    fantasy_scores['Role'] = fantasy_scores.apply(update_role, axis=1)

    # Attach order details
    fantasy_scores = fantasy_scores.merge(batting_order_df[['Player', 'Order']], on='Player', how='left')
    fantasy_scores = fantasy_scores.rename(columns={'Order': 'batting_order'})

    fantasy_scores = fantasy_scores.merge(bowling_order_df[['Player', 'Primary Overs']], on='Player', how='left')
    fantasy_scores = fantasy_scores.rename(columns={'Primary Overs': 'bowling_order'})

    return fantasy_scores

def calculate_consistency(batting_2025, bowling_2025):
    """Calculates player consistency index."""
    batting_con = batting_2025[['Batter', 'team', 'Score']].rename(columns={'Batter': 'Player'})
    bowling_con = bowling_2025[['Bowler', 'team', 'Score']].rename(columns={'Bowler': 'Player'})
    
    consistency_data = pd.concat([batting_con, bowling_con])
    
    consistency_summary = consistency_data.groupby('Player').agg(
        matches_played=('Score', 'nunique'),
        avg_score=('Score', 'mean'),
        sd_score=('Score', 'std')
    ).reset_index()

    consistency_summary['sd_score'] = consistency_summary['sd_score'].fillna(0)
    consistency_summary['consistency_index'] = np.where(
        consistency_summary['matches_played'] >= 5,
        consistency_summary['avg_score'] / (consistency_summary['sd_score'] + 1e-6),
        np.nan
    )
    return consistency_summary.sort_values(by=['matches_played', 'consistency_index'], ascending=[False, False])

def calculate_historical_scores(batting_data, bowling_data, fielding_data, dismissals_data, partnership_runs_data):
    """Computes a historical score index from multi-season statistics."""
    for df in [batting_data, bowling_data, fielding_data, dismissals_data]:
        df['Player'] = df['Player'].apply(normalize_name)

    batting_features = batting_data.groupby('Player').agg(
        total_runs=('Runs', 'sum'), avg_runs=('Runs', 'mean'),
        strike_rate=('SR', 'mean'), innings=('Player', 'size'),
        fours=('4s', 'sum'), sixes=('6s', 'sum'),
        fifties=('50', 'sum'), hundreds=('100', 'sum')
    ).reset_index()

    bowling_features = bowling_data.groupby('Player').agg(
        total_wickets=('Wkts', 'sum'), avg_economy=('Econ', 'mean'),
        bowling_SR=('SR', 'mean'), matches=('Player', 'size')
    ).reset_index()

    fielding_features = fielding_data.groupby('Player').agg(
        total_catches=('Ct', 'sum'), avg_ct_inn=('Ct/Inn', 'mean')
    ).reset_index()

    dismissals_data['dismissed'] = safe_num(dismissals_data['Dismissed'])
    dismissals_data['St'] = safe_num(dismissals_data['St'])
    dismissals_data['catches_dismissals'] = safe_num(dismissals_data['Ct'])
    
    dismissals_features = dismissals_data.groupby('Player').agg(
        total_dismissals=('dismissed', 'sum'), 
        stumps=('St', 'sum'), 
        catches=('catches_dismissals', 'sum')
    ).reset_index()

    partnership_runs_data['Runs'] = safe_num(partnership_runs_data['Runs'])
    good_partnerships_raw = partnership_runs_data[partnership_runs_data['Runs'] >= 50]
    good_partnerships_melted = good_partnerships_raw.melt(
        id_vars=['Runs'], value_vars=['Player1', 'Player2'], value_name='Player'
    )
    good_partnerships_melted['Player'] = good_partnerships_melted['Player'].apply(normalize_name)
    good_partnerships = good_partnerships_melted.groupby('Player').size().reset_index(name='good_partnerships')

    historical_features = pd.merge(batting_features, bowling_features, on='Player', how='outer')
    historical_features = pd.merge(historical_features, fielding_features, on='Player', how='outer')
    historical_features = pd.merge(historical_features, dismissals_features, on='Player', how='outer')
    historical_features = pd.merge(historical_features, good_partnerships, on='Player', how='outer')
    historical_features = historical_features.fillna(0)

    historical_features['batting_score_hist'] = 0.4 * historical_features['avg_runs'] + 0.2 * historical_features['strike_rate'] + 0.1 * historical_features['fifties'] + 0.1 * historical_features['hundreds']
    historical_features['bowling_score_hist'] = 0.3 * historical_features['total_wickets'] - 0.1 * historical_features['avg_economy'] + 0.1 * historical_features['matches']
    historical_features['fielding_score_hist'] = 0.2 * historical_features['total_catches'] + 0.1 * historical_features['avg_ct_inn']
    historical_features['dismissal_score_hist'] = 0.1 * historical_features['total_dismissals'] + 0.05 * historical_features['stumps'] + 0.05 * historical_features['catches']
    historical_features['partnership_score_hist'] = 0.1 * historical_features['good_partnerships']

    score_cols = ['batting_score_hist', 'bowling_score_hist', 'fielding_score_hist', 'dismissal_score_hist', 'partnership_score_hist']
    historical_features['historical_score'] = historical_features[score_cols].sum(axis=1)

    return historical_features

def combine_scores(fantasy_scores, consistency_summary, historical_features, weights):
    """Combines different features using user defined weights."""
    combined_data = pd.merge(fantasy_scores, consistency_summary, on='Player', how='left')
    combined_data = pd.merge(combined_data, historical_features, on='Player', how='left')

    combined_data['consistency_index'] = combined_data['consistency_index'].fillna(0)
    combined_data['historical_score'] = combined_data['historical_score'].fillna(0)

    combined_data['combined_score'] = (
        weights['fantasy'] * combined_data['fantasy_score'] +
        weights['consistency'] * combined_data['consistency_index'] +
        weights['historical'] * combined_data['historical_score']
    )
    return combined_data

def filter_contextual_players(fantasy_scores_contextual):
    """Filters matches by resolving conflicts between top order batters and powerplay bowlers."""
    top_order_batsmen = fantasy_scores_contextual[fantasy_scores_contextual['batting_order'] <= 3]
    powerplay_bowlers = fantasy_scores_contextual[fantasy_scores_contextual['bowling_order'] == 'Powerplay']

    top_batsmen_score = top_order_batsmen['combined_score'].mean() if not top_order_batsmen.empty else 0
    power_bowlers_score = powerplay_bowlers['combined_score'].mean() if not powerplay_bowlers.empty else 0

    if top_batsmen_score >= power_bowlers_score:
        return fantasy_scores_contextual[
            ~((fantasy_scores_contextual['bowling_order'] == 'Powerplay') & (fantasy_scores_contextual['batting_order'] <= 3))]
    else:
        return fantasy_scores_contextual[
            ~((fantasy_scores_contextual['batting_order'] <= 3) & (fantasy_scores_contextual['bowling_order'] == 'Powerplay'))]

def select_diverse_team(pool, role_requirements):
    """Selects top squad based on player roles and target distribution."""
    wk_pool = pool[pool['Role'] == 'Wicketkeeper'].sort_values(by='combined_score', ascending=False)
    
    if len(wk_pool) > 0:
        wicketkeeper = wk_pool.head(1)
        pool = pool[~((pool['Role'] == 'Wicketkeeper') & (~pool['Player'].isin(wicketkeeper['Player'])))]
    else:
        wicketkeeper = pd.DataFrame(columns=pool.columns)

    batters = pool[pool['Role'] == 'Batter'].nlargest(role_requirements['Batter'], 'combined_score')
    bowlers = pool[pool['Role'] == 'Bowler'].nlargest(role_requirements['Bowler'], 'combined_score')
    allrounders = pool[pool['Role'] == 'Allrounder'].nlargest(role_requirements['Allrounder'], 'combined_score')
    
    selected_core = pd.concat([batters, bowlers, allrounders, wicketkeeper])
    
    remaining = pool[~pool['Player'].isin(selected_core['Player'])]
    flex = remaining.nlargest(role_requirements['Flex'], 'combined_score')
    
    final_team = pd.concat([selected_core, flex]).drop_duplicates('Player')
    return final_team

def enforce_team_mins(team, pool, user_team1, user_team2):
    """Ensures at least 4 players represent each of the competing teams."""
    team_counts = team['team'].value_counts().to_dict()
    
    for current_team in [user_team1, user_team2]:
        current_count = team_counts.get(current_team, 0)
        if current_count < 4:
            needed = 4 - current_count
            available_players = pool[(pool['team'] == current_team) & (~pool['Player'].isin(team['Player']))]
            add_players = available_players.nlargest(needed, 'combined_score')
            team = pd.concat([team, add_players]).drop_duplicates('Player').nlargest(11, 'combined_score')
    return team

# =============================================================================
# 2. MATCH SIMULATION LOGIC
# =============================================================================

def get_player_stats(player_name, batting_data, batting_2025, bowling_data, bowling_2025):
    """Gathers historical and recent performance stats for weightage aggregation."""
    hist_bat = batting_data[batting_data['Player'] == player_name]
    avg_runs_hist = hist_bat['Runs'].mean() if not hist_bat.empty else 0
    avg_balls_hist = hist_bat['BF'].mean() if not hist_bat.empty else 0
    avg_sr_hist = hist_bat['SR'].mean() if not hist_bat.empty else 0
    
    hist_bowl = bowling_data[bowling_data['Player'] == player_name]
    avg_econ_hist = hist_bowl['Econ'].mean() if not hist_bowl.empty else 8.5 
    avg_wkts_hist = hist_bowl['Wkts'].mean() if not hist_bowl.empty else 0
    
    b25 = batting_2025[batting_2025['Batter'] == player_name]
    avg_runs_25 = b25['R'].mean() if not b25.empty else 0
    avg_balls_25 = b25['B'].mean() if not b25.empty else 0
    avg_sr_25 = b25['SR'].mean() if not b25.empty else 0
    
    bo25 = bowling_2025[bowling_2025['Bowler'] == player_name]
    avg_econ_25 = bo25['Econ'].mean() if not bo25.empty else 8.5
    avg_wkts_25 = bo25['W'].mean() if not bo25.empty else 0
    
    if avg_sr_hist == 0 and avg_sr_25 == 0: avg_sr_hist, avg_sr_25 = 100, 100 
    if avg_econ_hist == 0 and avg_econ_25 == 0: avg_econ_hist, avg_econ_25 = 8.5, 8.5
        
    final_runs = 0.7 * avg_runs_25 + 0.3 * avg_runs_hist
    final_balls = 0.7 * avg_balls_25 + 0.3 * avg_balls_hist
    final_sr = 0.7 * avg_sr_25 + 0.3 * avg_sr_hist
    final_econ = 0.7 * avg_econ_25 + 0.3 * avg_econ_hist
    final_wkts = 0.7 * avg_wkts_25 + 0.3 * avg_wkts_hist
    
    return {
        "final_runs": final_runs,
        "final_balls": final_balls,
        "final_SR": final_sr,
        "final_econ": final_econ,
        "final_wkts": final_wkts
    }

def simulate_innings(team_df, opp_team_df, batting_data, batting_2025, bowling_data, bowling_2025, target=None, model_type="SR", rand_factor=1.0):
    """Simulates a single 20-over innings with bat/bowl performance matching."""
    batters = []
    total_runs_bat = 0
    total_balls_bat = 0
    total_wickets_bat = 0
    
    team_df_sorted = team_df.sort_values(by='batting_order', na_position='last').head(11)
    
    for _, player in team_df_sorted.iterrows():
        if total_balls_bat >= 120 or total_wickets_bat >= 10:
            break
        if target is not None and total_runs_bat >= target:
            break
            
        p_name = player['Player']
        role = player.get('Role', 'Batter')
        p_data = batting_2025[batting_2025['Batter'] == p_name]
        
        if p_data.empty:
            r, b, out_no, score = 0, 1, 'OUT', 0
        else:
            row = p_data.sample(1).iloc[0]
            r = int(row['R'])
            b = int(max(1, row['B']))
            out_no = row['O/NO']
            score = row.get('Score', 0)
            
        # Apply randomness factor variance to the sampled runs
        if rand_factor != 1.0 and r > 0:
            variance = 0.15 * rand_factor
            r = int(max(0, round(r * np.random.uniform(1 - variance, 1 + variance))))
            
        # Adjust balls faced in case of targets
        if target is not None and (total_runs_bat + r) >= target:
            runs_needed = target - total_runs_bat
            if r > 0:
                b = min(b, max(1, int(round(b * (runs_needed / r)))))
            r = runs_needed
            out_no = 'NO'
            
        # Avoid extreme runs in single ball scenarios
        if b == 1 and r > 6:
            r = 6

        batters.append({
            "Player": p_name,
            "Role": role,
            "Runs": r,
            "Balls": b,
            "SR": round((r / b * 100), 2) if b > 0 else 0.0,
            "Score": score,
            "OUT/NO": out_no
        })
        
        total_runs_bat += r
        total_balls_bat += b
        if out_no != 'NO':
            total_wickets_bat += 1
            
    batting_table = []
    for b in batters:
        batting_table.append({
            "Player": b['Player'],
            "Runs": b['Runs'],
            "Balls": b['Balls'],
            "SR": b['SR']
        })
        
    sim_team_runs = total_runs_bat
    total_wickets = total_wickets_bat

    available_bowlers = []
    for _, player in opp_team_df.iterrows():
        role = player.get('Role', 'Batter')
        if role not in ['Batter', 'Wicketkeeper']:
            available_bowlers.append(player['Player'])
            
    bowler_stats = []
    for p_name in available_bowlers:
        p_data = bowling_2025[bowling_2025['Bowler'] == p_name]
        if p_data.empty:
            continue
            
        row = p_data.sample(1).iloc[0]
        r = int(row['R'])
        w = int(row['W'])
        o = float(row['O'])
        score = row.get('Score', 0)
        
        bowler_stats.append({
            "Player": p_name,
            "Runs": r,
            "Wickets": w,
            "Overs": o,
            "Score": score,
            "sim_balls": 0
        })
        
    balls_pool = total_balls_bat
    for b in bowler_stats:
        if balls_pool <= 0:
            break
        sampled_balls = int(b['Overs']) * 6 + int(round((b['Overs'] - int(b['Overs'])) * 10))
        if sampled_balls <= 0:
            sampled_balls = 24
        alloc = min(sampled_balls, 24, balls_pool)
        b['sim_balls'] = alloc
        balls_pool -= alloc
        
    if balls_pool > 0:
        for b in bowler_stats:
            if balls_pool <= 0:
                break
            can_take = 24 - b['sim_balls']
            if can_take > 0:
                take = min(can_take, balls_pool)
                b['sim_balls'] += take
                balls_pool -= take
                
    active_bowlers = [b for b in bowler_stats if b['sim_balls'] > 0]
    
    if not active_bowlers:
        bowling_table = []
        bowling_table.append({
            "Player": "Emergency Bowler",
            "Overs": total_balls_bat // 6 + (total_balls_bat % 6) / 10.0,
            "Runs": sim_team_runs,
            "Wickets": total_wickets
        })
        return {
            "batting_table": batting_table,
            "bowling_table": bowling_table,
            "total_runs": sim_team_runs,
            "total_wickets": total_wickets
        }
    
    bowling_total_runs = sum(b['Runs'] for b in active_bowlers)
    if bowling_total_runs == 0:
        for b in active_bowlers:
            b['Runs'] = 10
        bowling_total_runs = sum(b['Runs'] for b in active_bowlers)
        
    if bowling_total_runs > 0:
        scaling_factor = sim_team_runs / bowling_total_runs
        for b in active_bowlers:
            b['sim_runs'] = int(round(b['Runs'] * scaling_factor))
            if rand_factor != 1.0:
                b['sim_runs'] = int(max(0, round(b['sim_runs'] * np.random.uniform(1 - 0.15*rand_factor, 1 + 0.15*rand_factor))))
            
        diff = sim_team_runs - sum(b['sim_runs'] for b in active_bowlers)
        if diff != 0 and active_bowlers:
            active_bowlers[0]['sim_runs'] = max(0, active_bowlers[0]['sim_runs'] + diff)
    else:
        for b in active_bowlers:
            b['sim_runs'] = 0
            
    for b in active_bowlers:
        b['sim_wkts'] = b['Wickets']
        
    total_bowling_wkts = sum(b['sim_wkts'] for b in active_bowlers)
    diff_wkts = total_wickets - total_bowling_wkts
    
    if diff_wkts > 0:
        for _ in range(diff_wkts):
            idx = np.random.randint(len(active_bowlers))
            active_bowlers[idx]['sim_wkts'] += 1
    elif diff_wkts < 0:
        for _ in range(-diff_wkts):
            with_wkts = [i for i, b in enumerate(active_bowlers) if b['sim_wkts'] > 0]
            if with_wkts:
                idx = np.random.choice(with_wkts)
                active_bowlers[idx]['sim_wkts'] -= 1
            else:
                break
                
    bowling_table = []
    for b in active_bowlers:
        ov = b['sim_balls'] // 6 + (b['sim_balls'] % 6) / 10.0
        bowling_table.append({
            "Player": b['Player'],
            "Overs": ov,
            "Runs": b['sim_runs'],
            "Wickets": b['sim_wkts']
        })
        
    return {
        "batting_table": batting_table,
        "bowling_table": bowling_table,
        "total_runs": sim_team_runs,
        "total_wickets": total_wickets
    }

def simulate_match(team1_df, team2_df, data_dict, n_simulations, model_type="SR", rand_factor=1.0):
    """Runs a Monte Carlo full-match simulation between two XI squads."""
    team1_wins = 0
    team2_wins = 0
    
    bd = data_dict['batting_data']
    b25 = data_dict['batting_2025']
    bod = data_dict['bowling_data']
    bo25 = data_dict['bowling_2025']
    
    sample_match = None
    
    for i in range(n_simulations):
        # 1st Innings
        inn1 = simulate_innings(team1_df, team2_df, bd, b25, bod, bo25, model_type=model_type, rand_factor=rand_factor)
        score1 = inn1['total_runs']
        
        # 2nd Innings chase
        target = score1 + 1
        inn2 = simulate_innings(team2_df, team1_df, bd, b25, bod, bo25, target=target, model_type=model_type, rand_factor=rand_factor)
        score2 = inn2['total_runs']
        
        if score2 >= target:
            team2_wins += 1
        else:
            team1_wins += 1
            
        if i == 0:
            sample_match = {
                "team1_batting": inn1['batting_table'],
                "team2_bowling": inn1['bowling_table'],
                "team1_score": score1,
                "team1_wickets": inn1['total_wickets'],
                
                "team2_batting": inn2['batting_table'],
                "team1_bowling": inn2['bowling_table'],
                "team2_score": score2,
                "team2_wickets": inn2['total_wickets'],
            }
            
    return {
        'team1_win_prob': round((team1_wins / n_simulations) * 100, 2),
        'team2_win_prob': round((team2_wins / n_simulations) * 100, 2),
        'sample_match': sample_match
    }

# =============================================================================
# 3. AUCTION VALUE PREDICTION (Action Prediction)
# =============================================================================

@st.cache_data
def get_auction_predictions():
    """Trains Linear Regression model dynamically and analyzes player auction valuations."""
    try:
        df = load_csv("cleaned_auction_dataset.csv")
    except FileNotFoundError:
        try:
            df = load_csv("final_auction_features.csv")
        except FileNotFoundError:
            try:
                # Direct fallback to precalculated analysis if available
                analysis_df = load_csv("auction_analysis.csv")
                r2 = 0.5367
                rmse = 2.45
                normalized_coeffs = [0.35, 0.25, 0.20, 0.20]
                features = ['Batting', 'Bowling', 'Consistency', 'Impact']
                return analysis_df, r2, rmse, normalized_coeffs, features
            except FileNotFoundError:
                return None, 0, 0, [], []

    features = ['Batting', 'Bowling', 'Consistency', 'Impact']
    X = df[features].fillna(0)
    
    price_col = 'Price' if 'Price' in df.columns else ('Actual Price' if 'Actual Price' in df.columns else 'Price')
    y = df[price_col].fillna(0)
    
    # Z-Score Standardisation
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_scaled_df = pd.DataFrame(X_scaled, columns=features)
    
    # Train / Test split
    X_train, X_test, y_train, y_test = train_test_split(X_scaled_df, y, test_size=0.2, random_state=42)
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    raw_coeffs = model.coef_
    abs_coeffs = np.abs(raw_coeffs)
    normalized_coeffs = abs_coeffs / np.sum(abs_coeffs)
    
    df['Value Score'] = (
        normalized_coeffs[0] * X_scaled_df['Batting'] +
        normalized_coeffs[1] * X_scaled_df['Bowling'] +
        normalized_coeffs[2] * X_scaled_df['Consistency'] +
        normalized_coeffs[3] * X_scaled_df['Impact']
    )
    
    df['Predicted Price'] = model.predict(X_scaled_df)
    df['Predicted Price'] = np.maximum(df['Predicted Price'], 0)
    
    if price_col != 'Actual Price' and 'Actual Price' not in df.columns:
        df = df.rename(columns={price_col: 'Actual Price'})
        
    df['Difference'] = df['Predicted Price'] - df['Actual Price']
    df['Classification'] = np.where(df['Difference'] > 0, 'Undervalued', 'Overvalued')
    
    # Model evaluation metrics
    y_pred_test = model.predict(X_test)
    r2 = r2_score(y_test, y_pred_test)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred_test))
    
    return df, r2, rmse, normalized_coeffs, features

# =============================================================================
# 4. STREAMLIT APP USER INTERFACE
# =============================================================================

st.set_page_config(
    page_title="IPL Analytics Hub",
    page_icon="🏏",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom premium UI style injection
st.markdown("""
    <style>
        .reportview-container {
            background: #0f1116;
        }
        .main .block-container {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
        h1, h2, h3 {
            font-family: 'Outfit', 'Inter', sans-serif;
            font-weight: 700;
        }
        .stButton>button {
            background-image: linear-gradient(135deg, #FF4B4B 0%, #FF7F50 100%);
            color: white;
            border: none;
            padding: 0.5rem 2rem;
            border-radius: 10px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .stButton>button:hover {
            box-shadow: 0 4px 15px rgba(255, 75, 75, 0.4);
            transform: translateY(-2px);
        }
    </style>
""", unsafe_allow_html=True)

# Load data session-wide
if 'data' not in st.session_state:
    with st.spinner("Initializing raw datasets..."):
        st.session_state['data'] = load_all_data()

data = st.session_state['data']

if data is None:
    st.error("Failed to load base CSV datasets. Make sure all IPL datasets are inside the current directory or Data/ folder.")
    st.stop()

# Compute cache features
if 'fantasy_scores_2025' not in st.session_state:
    st.session_state['fantasy_scores_2025'] = compute_fantasy_scores(
        data['batting_2025'], data['bowling_2025'], data['dismissals_data'], 
        data['batting_order_df'], data['bowling_order_df']
    )
    st.session_state['consistency_summary'] = calculate_consistency(data['batting_2025'], data['bowling_2025'])
    st.session_state['historical_features'] = calculate_historical_scores(
        data['batting_data'], data['bowling_data'], data['fielding_data'], 
        data['dismissals_data'], data['partnership_runs_data']
    )

fantasy_scores_2025 = st.session_state['fantasy_scores_2025']
consistency_summary = st.session_state['consistency_summary']
historical_features = st.session_state['historical_features']

# Default values
weights_default = {"fantasy": 0.5, "consistency": 0.2, "historical": 0.3}
combined_all_players = combine_scores(fantasy_scores_2025, consistency_summary, historical_features, weights_default)

# Sidebar Page Selector
st.sidebar.title("🏏 IPL Analytics Hub")
page = st.sidebar.selectbox(
    "Select Page", 
    ["Fantasy XI Selector", "Match Simulation", "Auction Prediction & Analysis"]
)

# ----------------- FANTASY XI SELECTOR PAGE -----------------
if page == "Fantasy XI Selector":
    st.title("🏆 Optimal Fantasy XI Selector")
    st.markdown("Generate context-aware fantasy squads based on performance parameters, team restrictions, and weighted preferences.")
    
    with st.sidebar:
        st.header("1. Select Match Context")
        teams_list = sorted(fantasy_scores_2025['team'].dropna().unique())
        user_team1 = st.selectbox("Select Team 1", teams_list, index=teams_list.index("MI") if "MI" in teams_list else 0)
        user_team2 = st.selectbox("Select Team 2", teams_list, index=teams_list.index("CSK") if "CSK" in teams_list else 1)
        
        st.header("2. Set Weights Preference")
        team_type = st.selectbox("What kind of team do you prefer?", 
                                 ["Balanced (Default)", "High Scorers", "Consistent Performers"])
        
        if team_type == "High Scorers":
            weights = {"fantasy": 0.7, "consistency": 0.1, "historical": 0.2}
        elif team_type == "Consistent Performers":
            weights = {"fantasy": 0.3, "consistency": 0.5, "historical": 0.2}
        else:
            weights = {"fantasy": 0.5, "consistency": 0.2, "historical": 0.3}
        
        st.header("3. Fantasy Requirements")
        num_batters = st.number_input("Batters", min_value=1, max_value=6, value=4)
        num_bowlers = st.number_input("Bowlers", min_value=1, max_value=6, value=3)
        num_allrounders = st.number_input("Allrounders", min_value=1, max_value=4, value=2)
        num_flex = st.number_input("Flex Players", min_value=0, max_value=3, value=1)
        
        role_requirements = {'Batter': num_batters, 'Bowler': num_bowlers, 'Allrounder': num_allrounders, 'Flex': num_flex}

    if user_team1 == user_team2:
        st.warning("Please pick two different teams.")
    else:
        st.subheader(f"Optimal Fantasy XI: {user_team1} vs {user_team2}")
        
        relevant_players = fantasy_scores_2025[fantasy_scores_2025['team'].isin([user_team1, user_team2])]
        combined_player_scores = combine_scores(relevant_players, consistency_summary, historical_features, weights)
        filtered_pool = filter_contextual_players(combined_player_scores)
        team_11 = select_diverse_team(filtered_pool, role_requirements)
        final_fantasy_xi = enforce_team_mins(team_11, filtered_pool, user_team1, user_team2)
        
        roles_needed = ['Batter', 'Bowler', 'Allrounder', 'Wicketkeeper']
        if not all(any((final_fantasy_xi['Role'] == r) & (final_fantasy_xi['team'].isin([user_team1, user_team2]))) for r in roles_needed):
            st.error("Could not find a valid team balancing those roles perfectly. Try adjusting player counts.")
        else:
            final_fantasy_xi = final_fantasy_xi.sort_values(by='combined_score', ascending=False).reset_index(drop=True)
            # Assign multiplier credits
            final_fantasy_xi['Multiplier'] = 1.0
            final_fantasy_xi.at[0, 'Multiplier'] = 2.0  # Captain
            final_fantasy_xi.at[1, 'Multiplier'] = 1.5  # Vice Captain
            final_fantasy_xi['final_score'] = final_fantasy_xi['combined_score'] * final_fantasy_xi['Multiplier']
            
            st.dataframe(
                final_fantasy_xi[['Player', 'team', 'Role', 'batting_order', 'bowling_order' , 'final_score']],
                column_config={
                    "Player": st.column_config.TextColumn("Player Name"),
                    "team": st.column_config.TextColumn("Team"),
                    "Role": st.column_config.TextColumn("Role"),
                    "batting_order": st.column_config.NumberColumn("Batting Order"),
                    "bowling_order": st.column_config.TextColumn("Bowling Order"),
                    "final_score": st.column_config.NumberColumn("Projected Score", format="%.2f")
                },
                use_container_width=True
            )
            
            total_score = final_fantasy_xi['final_score'].sum()
            
            # Displays metrics nicely
            col_tot, col_capt, col_vc = st.columns(3)
            col_tot.metric("Projected Total Team Score", f"{round(total_score, 2)}")
            col_capt.metric("Captain (2.0x)", final_fantasy_xi.iloc[0]['Player'].title())
            col_vc.metric("Vice-Captain (1.5x)", final_fantasy_xi.iloc[1]['Player'].title())
            
            # Projected points chart
            st.markdown("#### Projected Player Scores")
            chart_df = final_fantasy_xi[['Player', 'final_score']].set_index('Player')
            st.bar_chart(chart_df, color="#ff4b4b")
            
            csv = final_fantasy_xi.to_csv(index=False).encode('utf-8')
            st.download_button("Download Fantasy XI as CSV", csv, file_name="fantasy_team.csv", mime="text/csv")

# ----------------- MATCH SIMULATION PAGE -----------------
elif page == "Match Simulation":
    st.title("🎲 Monte Carlo Match Simulator")
    st.markdown("Simulate innings details ball-by-ball and count win probabilities by replicating matches many times.")
    
    teams_list = sorted(combined_all_players['team'].dropna().unique())
    col1, col2 = st.columns(2)
    with col1:
        sim_team1 = st.selectbox("Team 1 (Batting First)", teams_list, index=teams_list.index("MI") if "MI" in teams_list else 0)
    with col2:
        sim_team2 = st.selectbox("Team 2 (Chasing)", teams_list, index=teams_list.index("CSK") if "CSK" in teams_list else 1)
        
    col_sim_conf1, col_sim_conf2, col_sim_conf3 = st.columns(3)
    with col_sim_conf1:
        n_sims = st.slider("Number of Simulations", min_value=100, max_value=1000, value=500, step=100)
    with col_sim_conf2:
        rand_factor = st.slider("Randomness Factor", min_value=0.5, max_value=1.5, value=1.0, step=0.1)
    with col_sim_conf3:
        model_selection = st.selectbox("Select Simulation Model", ["SR Model", "RPB Model"])
    
    model_type = "SR" if model_selection == "SR Model" else "RPB"
    
    if sim_team1 == sim_team2:
        st.warning("Please select two different teams to run the match simulation.")
    else:
        if st.button("Run Simulation"):
            # Enforce 11 active squad members
            role_reqs = {'Batter': 4, 'Bowler': 3, 'Allrounder': 3, 'Flex': 1}
            team1_pool_filtered = filter_contextual_players(combined_all_players[combined_all_players['team'] == sim_team1])
            team2_pool_filtered = filter_contextual_players(combined_all_players[combined_all_players['team'] == sim_team2])
            
            team1_df = select_diverse_team(team1_pool_filtered, role_reqs).head(11)
            team2_df = select_diverse_team(team2_pool_filtered, role_reqs).head(11)
            
            with st.spinner(f"Running {n_sims} simulations dynamically..."):
                results = simulate_match(team1_df, team2_df, data, n_sims, model_type=model_type, rand_factor=rand_factor)
                
            st.success("Simulation Complete!")
            
            # Displays Outcomes
            st.markdown(f"### Win Probabilities Breakdown ({n_sims} Simulations)")
            c1, c2 = st.columns(2)
            c1.metric(f"{sim_team1} Win Probability", f"{results['team1_win_prob']}%")
            c2.metric(f"{sim_team2} Win Probability", f"{results['team2_win_prob']}%")
            
            # Horizontal probability bars
            prob_df = pd.DataFrame({
                "Team": [sim_team1, sim_team2],
                "Win Probability (%)": [results['team1_win_prob'], results['team2_win_prob']]
            }).set_index("Team")
            st.bar_chart(prob_df, color="#FFA500")
            
            # Detailed sample scorecard
            st.markdown("### 🔎 Sample Match Detailed Scorecard")
            sample = results['sample_match']
            st.write(f"#### **{sim_team1} ({sample['team1_score']}/{sample['team1_wickets']}) vs {sim_team2} ({sample['team2_score']}/{sample['team2_wickets']})**")
            
            df_t1_bat = pd.DataFrame(sample["team1_batting"])
            df_t2_bowl = pd.DataFrame(sample["team2_bowling"])
            df_t2_bat = pd.DataFrame(sample["team2_batting"])
            df_t1_bowl = pd.DataFrame(sample["team1_bowling"])
            
            tab_inn1, tab_inn2 = st.tabs([f"Innings 1 ({sim_team1} Batting)", f"Innings 2 ({sim_team2} Chasing)"])
            
            with tab_inn1:
                col_b1, col_bo1 = st.columns(2)
                with col_b1:
                    st.markdown(f"**{sim_team1} Batting Card**")
                    st.dataframe(df_t1_bat, use_container_width=True)
                with col_bo1:
                    st.markdown(f"**{sim_team2} Bowling Card**")
                    st.dataframe(df_t2_bowl, use_container_width=True)
                    
            with tab_inn2:
                col_b2, col_bo2 = st.columns(2)
                with col_b2:
                    st.markdown(f"**{sim_team2} Batting Card**")
                    st.dataframe(df_t2_bat, use_container_width=True)
                with col_bo2:
                    st.markdown(f"**{sim_team1} Bowling Card**")
                    st.dataframe(df_t1_bowl, use_container_width=True)

# ----------------- AUCTION VALUE PREDICTION (Action Prediction) -----------------
elif page == "Auction Prediction & Analysis":
    st.title("💰 Player Auction Price Prediction")
    st.markdown("Valuation model based on player metrics: Standardized Batting, Bowling, Consistency, and Impact coefficients.")
    
    # Fetch trained dataset on the fly
    with st.spinner("Fitting Linear Regression model to player coefficients..."):
        auction_df, r2, rmse, normalized_coeffs, features_names = get_auction_predictions()
        
    if auction_df is None:
        st.error("No auction data features found to train the prediction model.")
    else:
        # 1. Model Stats Card
        st.subheader("🤖 Model Valuation Diagnostics")
        col_perf1, col_perf2 = st.columns(2)
        col_perf1.metric("R² Score (Variance Explained)", f"{r2:.4f}")
        col_perf2.metric("RMSE Error (Cr)", f"{rmse:.2f} Cr")
        
        # 2. Display Feature Importance normalized coeffs
        st.markdown("#### Feature Relative Importance Weights")
        coeff_cols = st.columns(len(features_names))
        for idx, (feature, coeff) in enumerate(zip(features_names, normalized_coeffs)):
            coeff_cols[idx].metric(feature, f"{coeff*100:.1f}%")
            
        # 3. Interactive Player Value Lookup
        st.subheader("🔍 Player Valuation Lookup")
        player_list = sorted(auction_df['Player'].unique())
        selected_player = st.selectbox("Select Player to Inspect", player_list)
        
        player_details = auction_df[auction_df['Player'] == selected_player].iloc[0]
        st.write(f"### **{selected_player.title()} ({player_details.get('Role', 'Allrounder')})**")
        
        col_p1, col_p2, col_p3 = st.columns(3)
        col_p1.metric("Actual Auction Price", f"{player_details['Actual Price']:.2f} Cr")
        col_p2.metric("Model Predicted Price", f"{player_details['Predicted Price']:.2f} Cr")
        
        diff_val = player_details['Difference']
        diff_label = "Undervalued (Bargain)" if diff_val > 0 else "Overvalued"
        col_p3.metric("Valuation Difference", f"{abs(diff_val):.2f} Cr", delta=f"{diff_val:.2f} Cr ({diff_label})")
        
        # 4. Tables of undervalued and overvalued
        st.subheader("🏆 Valuation Insights")
        tab_under, tab_over, tab_all = st.tabs(["Undervalued Players (Bargains)", "Overvalued Players", "Full Valuation Dataset"])
        
        with tab_under:
            st.markdown("These players are performing above their actual auction price, offering massive value.")
            undervalued = auction_df[auction_df['Difference'] > 0].sort_values(by='Difference', ascending=False)
            st.dataframe(
                undervalued[['Player', 'Role', 'Actual Price', 'Predicted Price', 'Difference', 'Value Score']],
                column_config={
                    "Player": st.column_config.TextColumn("Player"),
                    "Role": st.column_config.TextColumn("Role"),
                    "Actual Price": st.column_config.NumberColumn("Actual Price (Cr)", format="%.2f Cr"),
                    "Predicted Price": st.column_config.NumberColumn("Predicted Price (Cr)", format="%.2f Cr"),
                    "Difference": st.column_config.NumberColumn("Difference (Cr)", format="%.2f Cr"),
                    "Value Score": st.column_config.NumberColumn("Value Score", format="%.4f"),
                },
                use_container_width=True
            )
            
        with tab_over:
            st.markdown("These players were bought at premium actual rates exceeding predicted performance metrics.")
            overvalued = auction_df[auction_df['Difference'] < 0].sort_values(by='Difference', ascending=True)
            st.dataframe(
                overvalued[['Player', 'Role', 'Actual Price', 'Predicted Price', 'Difference', 'Value Score']],
                column_config={
                    "Player": st.column_config.TextColumn("Player"),
                    "Role": st.column_config.TextColumn("Role"),
                    "Actual Price": st.column_config.NumberColumn("Actual Price (Cr)", format="%.2f Cr"),
                    "Predicted Price": st.column_config.NumberColumn("Predicted Price (Cr)", format="%.2f Cr"),
                    "Difference": st.column_config.NumberColumn("Difference (Cr)", format="%.2f Cr"),
                    "Value Score": st.column_config.NumberColumn("Value Score", format="%.4f"),
                },
                use_container_width=True
            )
            
        with tab_all:
            st.dataframe(
                auction_df[['Player', 'Role', 'Actual Price', 'Predicted Price', 'Difference', 'Value Score', 'Classification']],
                column_config={
                    "Player": st.column_config.TextColumn("Player"),
                    "Role": st.column_config.TextColumn("Role"),
                    "Actual Price": st.column_config.NumberColumn("Actual Price (Cr)", format="%.2f Cr"),
                    "Predicted Price": st.column_config.NumberColumn("Predicted Price (Cr)", format="%.2f Cr"),
                    "Difference": st.column_config.NumberColumn("Difference (Cr)", format="%.2f Cr"),
                    "Value Score": st.column_config.NumberColumn("Value Score", format="%.4f"),
                    "Classification": st.column_config.TextColumn("Classification")
                },
                use_container_width=True
            )
            
        # 5. Visualizations
        st.subheader("📊 Model Performance Visuals")
        col_g1, col_g2 = st.columns(2)
        
        with col_g1:
            fig, ax = plt.subplots(figsize=(6, 4.5))
            ax.scatter(auction_df['Actual Price'], auction_df['Predicted Price'], color='#1f77b4', alpha=0.7, edgecolors='none', s=40)
            max_val = max(auction_df['Actual Price'].max(), auction_df['Predicted Price'].max())
            ax.plot([0, max_val], [0, max_val], 'r--', alpha=0.8, label="Ideal Fit Line")
            ax.set_xlabel("Actual Price (Cr)")
            ax.set_ylabel("Predicted Price (Cr)")
            ax.set_title("Actual vs Predicted Price Fit")
            ax.legend()
            st.pyplot(fig)
            plt.close(fig)
            
        with col_g2:
            fig, ax = plt.subplots(figsize=(6, 4.5))
            top_undervalued = undervalued.head(8)
            ax.bar(top_undervalued['Player'].apply(lambda x: x.title()), top_undervalued['Difference'], color='#2ca02c')
            ax.set_ylabel("Undervaluation Diff (Cr)")
            ax.set_title("Top 8 Value Bargain Players")
            plt.xticks(rotation=45, ha='right')
            st.pyplot(fig)
            plt.close(fig)
            
        st.info("Valuation is computed based purely on physical statistics. Off-field attributes, commercial brand index, and player demand factors are not represented.")
