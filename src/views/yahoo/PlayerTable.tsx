// src/PlayerTable.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

// Define types for API response
interface Team {
  full_name: string;
}

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  position: string | null;
  team: Team;
}

interface ApiResponse {
  data: Player[];
  meta: {
    total_pages: number;
  };
}

const PlayerTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPlayers = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/v1/players`, {
        params: {
          page: page,
          per_page: 10,
        },
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
          Pragma: "no-cache", // For older HTTP/1.0 proxies
          "If-Modified-Since": "0", // Bypass 304 responses
        },
      });

      const playersData = response.data?.data ?? [];
      const totalPages = response.data?.meta?.total_pages ?? 1;

      if (Array.isArray(playersData)) {
        setPlayers((prevPlayers) => [...prevPlayers, ...playersData]);
        setHasMore(page < totalPages);
      } else {
        console.error("Unexpected data format:", response.data);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching players:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers(page);
  }, [page]);

  const lastPlayerElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <h2>Basketball Players</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {players.map((player, index) => {
          console.log(player.first_name);
          if (players.length === index + 1) {
            return (
              <div
                ref={lastPlayerElementRef}
                key={player.id}
                style={{
                  width: "150px",
                  margin: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <p>
                  <strong>
                    {player.first_name} {player.last_name}
                  </strong>
                </p>
                <p>Position: {player.position || "N/A"}</p>
                <p>Team: {player.team.full_name}</p>
              </div>
            );
          } else {
            return (
              <div
                key={player.id}
                style={{
                  width: "150px",
                  margin: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <p>
                  <strong>
                    {player.first_name} {player.last_name}
                  </strong>
                </p>
                <p>Position: {player.position || "N/A"}</p>
                <p>Team: {player.team.full_name}</p>
              </div>
            );
          }
        })}
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PlayerTable;
