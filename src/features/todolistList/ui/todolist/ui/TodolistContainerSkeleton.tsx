import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';

export const TodolistContainerSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <>
      <Grid container spacing={3}>
        {Array(count)
          .fill(null)
          .map((_) => (
            <Grid container xs={12} md={6} lg={4}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <Skeleton variant="rounded" width={330} height={120} />
                <Skeleton variant="rounded" width={330} height={40} />
                <Skeleton variant="rounded" width={330} height={40} />
                <Skeleton variant="rounded" width={330} height={16} />
                <Skeleton variant="rounded" width={330} height={16} />
                <Skeleton variant="rounded" width={330} height={16} />
                <Skeleton variant="rounded" width={330} height={16} />
              </Stack>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
