import axios from "axios";

interface GuestToken {
  guestToken: string;
}

export const getGuestToken = async (): Promise<GuestToken> => {
  const response = await axios.get(
    "https://localhost:5000/auth/guest-token",
    {}
  );
  return response.data as GuestToken;
};
