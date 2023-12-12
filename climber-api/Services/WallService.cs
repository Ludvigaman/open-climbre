using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IWallService
    {
        Task<IList<Wall>> GetWalls();
        Task<Wall> GetWall(Guid id);
        Task<int> DeleteWall(Guid id);
        Task<Wall> CreateWall(Wall wall);
        Task<bool> MarkWallAsRemoved(Guid id);
        Task<Wall> ModifyWall(Wall wall);
    }
    public class WallService : IWallService
    {
        private DataContext _context;

        public WallService(DataContext context)
        {
            _context = context;
        }

        public async Task<IList<Wall>> GetWalls()
        {
            return _context.Walls.ToList();
        }

        public async Task<Wall> GetWall(Guid id)
        {
            return _context.Walls.Where(x => x.Id == id).FirstOrDefault();
        }

        public async Task<Wall> CreateWall(Wall wall)
        {
            await _context.Walls.AddAsync(wall);

            var result = await _context.SaveChangesAsync();
            if(result > 0)
            {
                return wall;
            } else
            {
                return null;
            }
        }

        public async Task<int> DeleteWall(Guid id)
        {
            var wall = _context.Walls.FirstOrDefault(x => x.Id == id);
            if(wall != null)
            {
                _context.Walls.Remove(wall);
                var result = await _context.SaveChangesAsync();

                return result;
            }
            return 0;
        }

        public async Task<bool> MarkWallAsRemoved(Guid id)
        {
            var wall = _context.Walls.FirstOrDefault(x => x.Id == id);
            if (wall != null)
            {
                wall.Removed = DateTime.Now;

                var result = await _context.SaveChangesAsync();

                if(result == 1)
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<Wall> ModifyWall(Wall modifiedWall)
        {
            Wall TempWall = _context.Walls.FirstOrDefault(x => x.Id == modifiedWall.Id);
            if(TempWall == null)
            {
                System.Diagnostics.Debug.WriteLine("Wall not found...");
                return null;
            }

            TempWall.Created = modifiedWall.Created;
            TempWall.Removed = modifiedWall.Removed;
            TempWall.TypesJSON = modifiedWall.TypesJSON;
            TempWall.Grade = modifiedWall.Grade;
            TempWall.Anchor = modifiedWall.Anchor;
            TempWall.Color = modifiedWall.Color;
            TempWall.Description = modifiedWall.Description;
            TempWall.Name = modifiedWall.Name;              

            _context.Walls.Update(TempWall);

            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return modifiedWall;
            }
            else
            {
                return null;
            }
        }

        public async Task<Wall> AddUserRating(Guid id, UserRating rating)
        {
            Wall tempWall = await _context.Walls.FindAsync(id);
            tempWall.Rating.UserRatings.Append(rating);
            _context.Walls.Update(tempWall);

            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return tempWall;
            }
            else
            {
                return null;
            }

        }

        public async Task<Rating> CalculateRating(Rating rating)
        {
            Rating temp = await _context.Ratings.FindAsync(rating.Id);

            double avg = 0;
            for(int i = 1; i < temp.UserRatings.Length + 1; i++)
            {
                avg = avg + (int)temp.UserRatings[i].Rate;
                avg = avg / i;
            }
            int avgInt = (int)Math.Round(avg);
            temp.Rate = (Star)avgInt;
            return temp;
            
        }
    }
}
