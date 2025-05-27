import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

function DisputeForm({ orderId, onDisputeSubmitted, onCancel }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);

  const handleFileChange = (event) => {
    setEvidenceFiles((prev) => [...prev, ...Array.from(event.target.files)]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setEvidenceFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call onDisputeSubmitted with form data or handle validation here
    onDisputeSubmitted({ reason, description, evidenceFiles });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, p: 3, border: '1px solid #eee', borderRadius: 2, backgroundColor: '#fafafa' }}
      >
        <Typography variant="h5" gutterBottom>
          Open a Dispute for Order #{orderId.substring(0, 8)}
        </Typography>

        <TextField
          label="Reason for Dispute"
          fullWidth
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          margin="normal"
          helperText="E.g., Item not as described, damaged, not received."
        />

        <TextField
          label="Detailed Description"
          fullWidth
          required
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          helperText="Provide as much detail as possible."
        />

        <Button variant="outlined" component="label" sx={{ mt: 2, mb: 1 }}>
          Upload Evidence (Images/Videos)
          <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>

        {evidenceFiles.length > 0 && (
          <List
            dense
            sx={{
              maxHeight: 150,
              overflowY: 'auto',
              border: '1px solid #f0f0f0',
              borderRadius: 1,
              mb: 2,
              bgcolor: '#fff',
            }}
          >
            {evidenceFiles.map((file, index) => (
              <ListItem
                key={`${file.name}-${index}`}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="error">
            Submit Dispute
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
}

export default DisputeForm;
