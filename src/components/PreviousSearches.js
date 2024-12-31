import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchWithHandling } from "../utils/apiUtils";

export default function PreviousSearches() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await fetchWithHandling(`${apiUrl}/recipes/search/fuzzy?name=${query}`);
                setSuggestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [query]);

    const handleSelect = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <div className="previous-searches section">
            <h2>Search Recipes</h2>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="previous-searches-container">
                {suggestions.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="search-item"
                        onClick={() => handleSelect(recipe.id)}
                    >
                        {recipe.name} - {recipe.cuisine}
                    </div>
                ))}
            </div>
        </div>
    );
}
