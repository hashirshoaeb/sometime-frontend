
export default function EventPage({ params }: { params: { eventId: string } }) {
  const id = params.eventId;
  return (
    <div>
      Event Page {id}
    </div>
  );
}