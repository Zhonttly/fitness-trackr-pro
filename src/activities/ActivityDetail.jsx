import { useState, useEffect } from "react";
import { deleteActivity, getActivity } from "../api/activities";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

const ActivityDetails = () => {
  const { token } = useAuth();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { activityId } = useParams(); //fetches the parameter from the navigation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      const data = await getActivity(activityId);
      setActivity(data);
    };
    fetchActivity();
  }, [activityId]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <main>
      <h1>{activity.name}</h1>
      <p>by {activity.creatorName}</p>
      <p>{activity.description}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </main>
  );
};

export default ActivityDetails;
